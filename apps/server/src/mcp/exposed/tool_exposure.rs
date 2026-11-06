use crate::catalog::RegistryCatalog;
use crate::mcp::annotations::{create_tool_annotations, read_verb};
use crate::mcp::exposed::consts::PARALLEL_SECTION_LOADS;
use crate::mcp::exposed::create_section::create_section;
use crate::mcp::exposed::describe_opened_section::describe_opened_section;
use crate::mcp::exposed::expand_entries::expand_entries;
use crate::mcp::exposed::exposed_entry::ExposedEntry;
use crate::mcp::exposed::exposed_section::ExposedSection;
use crate::mcp::exposed::exposed_tool::ExposedTool;
use crate::mcp::exposed::fetch_section::fetch_section;
use crate::mcp::exposed::fetched_section::FetchedSection;
use crate::mcp::exposed::opened_section::OpenedSection;
use crate::mcp::exposed::pick_free_name::pick_free_name;
use crate::mcp::exposed::tool_loading::ToolLoading;
use futures_util::{StreamExt, stream};
use serde_json::json;
use std::cell::RefCell;
use std::collections::{HashMap, HashSet};
use std::rc::Rc;
use tokio::sync::OnceCell;
use usemcpkit_registry::Fetch;
use usemcpkit_wire_log::WireLog;

type LoadedChildren = Result<Vec<Rc<ExposedEntry>>, String>;

/// With partial loading the tool list starts as one section per server and grows as the model opens them: a server
/// lists its groups, a group (or a server that is not split) puts its tools in the list, and nothing is downloaded
/// until a section is opened. With full loading the first listing opens every section that starts nothing (every
/// registry server, and an upstream whose tools are cached) and lists their tools without the sections; the rest stay
/// sections. A server whose section cannot be opened stays closed and says why, so one broken server never hides the
/// others. Calls that open the same section at once share one load.
pub struct ToolExposure<F> {
    catalog: Rc<RegistryCatalog<F>>,
    wire_log: Rc<WireLog>,
    mode: ToolLoading,
    /// Set once full loading opened what it could; never set with partial loading.
    loaded_all: OnceCell<()>,
    roots: Vec<Rc<ExposedEntry>>,
    taken: RefCell<HashSet<String>>,
    children: RefCell<HashMap<String, Vec<Rc<ExposedEntry>>>>,
    loading: RefCell<HashMap<String, Rc<OnceCell<LoadedChildren>>>>,
}

impl<F: Fetch> ToolExposure<F> {
    pub fn new(catalog: Rc<RegistryCatalog<F>>, wire_log: Rc<WireLog>, mode: ToolLoading) -> Self {
        let mut taken = HashSet::new();
        let roots = catalog
            .servers
            .iter()
            .map(|server| Rc::new(ExposedEntry::Section(create_section(server, None, &mut taken))))
            .collect();
        ToolExposure {
            catalog,
            wire_log,
            mode,
            loaded_all: OnceCell::new(),
            roots,
            taken: RefCell::new(taken),
            children: RefCell::new(HashMap::new()),
            loading: RefCell::new(HashMap::new()),
        }
    }

    /// The entries in catalog order, each opened section followed by what it holds.
    pub fn list(&self) -> Vec<Rc<ExposedEntry>> {
        let mut listed = Vec::new();
        let hide_opened = self.mode == ToolLoading::Full;
        expand_entries(&self.roots, &self.children.borrow(), hide_opened, &mut listed);
        listed
    }

    pub fn find(&self, name: &str) -> Option<Rc<ExposedEntry>> {
        self.list().into_iter().find(|entry| entry.name() == name)
    }

    /// With full loading, opens every section that starts nothing the first time it is asked; a no-op afterwards and
    /// with partial loading. Callers wait for it before they list or look up a tool.
    pub async fn settle(&self) {
        if self.mode == ToolLoading::Full {
            self.loaded_all.get_or_init(|| self.load_all()).await;
        }
    }

    /// Loads what is inside `section` once and returns the text the model gets back for calling it.
    pub async fn open(&self, section: &ExposedSection) -> Result<OpenedSection, String> {
        let key = section.key();
        let known = self.children.borrow().get(&key).cloned();
        self.wire_log
            .record("section-open", json!({ "section": key, "known": known.is_some() }));
        if let Some(known) = known {
            return Ok(OpenedSection {
                text: describe_opened_section(&key, &known),
                tools_changed: false,
            });
        }
        let (opened, tools_changed) = self.load_section(section).await?;
        if tools_changed {
            self.wire_log
                .record("tools-changed", json!({ "section": key, "entries": opened.len() }));
        }
        Ok(OpenedSection {
            text: describe_opened_section(&key, &opened),
            tools_changed,
        })
    }

    /// What is inside `section`, loaded once however many calls ask at the same time, and whether this call is the one
    /// that put it in the list.
    async fn load_section(&self, section: &ExposedSection) -> Result<(Vec<Rc<ExposedEntry>>, bool), String> {
        let key = section.key();
        let pending = Rc::clone(self.loading.borrow_mut().entry(key.clone()).or_default());
        let loaded = pending.get_or_init(|| self.load_children(section)).await.clone();
        self.forget_load(&key, &pending);
        let opened = loaded?;
        let inserted = self.insert_children(key, &opened);
        Ok((opened, inserted))
    }

    /// Puts what a section holds into the list unless an earlier load already did; true when this one did.
    fn insert_children(&self, key: String, children: &[Rc<ExposedEntry>]) -> bool {
        let mut opened = self.children.borrow_mut();
        if opened.contains_key(&key) {
            return false;
        }
        opened.insert(key, children.to_vec());
        true
    }

    /// Opens each server that starts nothing, then all of their groups. The files are downloaded
    /// [`PARALLEL_SECTION_LOADS`] at a time, but the entries are named in catalog order, so every tool gets the same name
    /// on every start. A section that fails is reported on stderr and stays a section.
    async fn load_all(&self) {
        let mut servers = Vec::new();
        for root in &self.roots {
            let ExposedEntry::Section(section) = &**root else {
                continue;
            };
            match self.catalog.opens_without_starting(&section.server_id).await {
                Ok(true) => servers.push(section),
                Ok(false) => {}
                Err(error) => eprintln!("{}: could not load its tools: {error}", section.server_id),
            }
        }
        let opened = self.load_in_parallel(&servers).await;
        let groups: Vec<&ExposedSection> = opened
            .iter()
            .filter_map(|entry| match &**entry {
                ExposedEntry::Section(group) => Some(group),
                ExposedEntry::Tool(_) => None,
            })
            .collect();
        self.load_in_parallel(&groups).await;
        self.wire_log
            .record("tools-loaded", json!({ "entries": self.list().len() }));
    }

    /// Fetches the sections a few at a time, then names and lists what each holds in the order given; returns every
    /// entry they opened into.
    async fn load_in_parallel(&self, sections: &[&ExposedSection]) -> Vec<Rc<ExposedEntry>> {
        let fetched: Vec<_> = stream::iter(sections.iter().map(|section| fetch_section(&self.catalog, section)))
            .buffered(PARALLEL_SECTION_LOADS)
            .collect()
            .await;
        let mut opened = Vec::new();
        for (section, fetched) in sections.iter().zip(fetched) {
            match fetched.and_then(|fetched| self.name_children(section, fetched)) {
                Ok(children) => {
                    self.insert_children(section.key(), &children);
                    opened.extend(children);
                }
                Err(error) => eprintln!("{}: could not load its tools: {error}", section.key()),
            }
        }
        opened
    }

    /// A failed load is forgotten so the next call tries again; a newer load of the same section is left alone.
    fn forget_load(&self, key: &str, pending: &Rc<OnceCell<LoadedChildren>>) {
        let mut loading = self.loading.borrow_mut();
        if loading.get(key).is_some_and(|current| Rc::ptr_eq(current, pending)) {
            loading.remove(key);
        }
    }

    async fn load_children(&self, section: &ExposedSection) -> LoadedChildren {
        let fetched = fetch_section(&self.catalog, section).await?;
        self.name_children(section, fetched)
    }

    /// Gives each group a section and each tool its exposed name, taking the names in the order they come.
    fn name_children(&self, section: &ExposedSection, fetched: FetchedSection) -> LoadedChildren {
        let server = self.catalog.find_server(&section.server_id)?;
        let mut taken = self.taken.borrow_mut();
        let children = match fetched {
            FetchedSection::Groups(groups) => groups
                .iter()
                .map(|group| Rc::new(ExposedEntry::Section(create_section(server, Some(group), &mut taken))))
                .collect(),
            FetchedSection::Tools(descriptors) => descriptors
                .into_iter()
                .map(|descriptor| {
                    Rc::new(ExposedEntry::Tool(ExposedTool {
                        name: pick_free_name(&server.id, &descriptor.tool, &mut taken),
                        server_id: server.id.clone(),
                        annotations: create_tool_annotations(read_verb(&descriptor.tool)),
                        tool: descriptor.tool,
                        description: descriptor.description,
                        input_schema: descriptor.input_schema,
                    }))
                })
                .collect(),
        };
        Ok(children)
    }
}
