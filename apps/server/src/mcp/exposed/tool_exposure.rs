use crate::catalog::RegistryCatalog;
use crate::mcp::annotations::{create_tool_annotations, read_verb};
use crate::mcp::exposed::create_section::create_section;
use crate::mcp::exposed::describe_opened_section::describe_opened_section;
use crate::mcp::exposed::expand_entries::expand_entries;
use crate::mcp::exposed::exposed_entry::ExposedEntry;
use crate::mcp::exposed::exposed_section::ExposedSection;
use crate::mcp::exposed::exposed_tool::ExposedTool;
use crate::mcp::exposed::load_group_names::load_group_names;
use crate::mcp::exposed::load_group_tools::load_group_tools;
use crate::mcp::exposed::opened_section::OpenedSection;
use crate::mcp::exposed::pick_free_name::pick_free_name;
use serde_json::json;
use std::cell::RefCell;
use std::collections::{HashMap, HashSet};
use std::rc::Rc;
use tokio::sync::OnceCell;
use usemcpkit_registry::Fetch;
use usemcpkit_wire_log::WireLog;

type LoadedChildren = Result<Vec<Rc<ExposedEntry>>, String>;

/// The tool list starts as one section per server and grows as the model opens them: a server lists its groups, a
/// group (or a server that is not split) puts its tools in the list. Nothing is downloaded until a section is opened.
/// A server whose section cannot be opened stays closed and says why in the reply, so one broken server never hides
/// the others. Calls that open the same section at once share one load.
pub struct ToolExposure<F> {
    catalog: Rc<RegistryCatalog<F>>,
    wire_log: Rc<WireLog>,
    roots: Vec<Rc<ExposedEntry>>,
    taken: RefCell<HashSet<String>>,
    children: RefCell<HashMap<String, Vec<Rc<ExposedEntry>>>>,
    loading: RefCell<HashMap<String, Rc<OnceCell<LoadedChildren>>>>,
}

impl<F: Fetch> ToolExposure<F> {
    pub fn new(catalog: Rc<RegistryCatalog<F>>, wire_log: Rc<WireLog>) -> Self {
        let mut taken = HashSet::new();
        let roots = catalog
            .servers
            .iter()
            .map(|server| Rc::new(ExposedEntry::Section(create_section(server, None, &mut taken))))
            .collect();
        ToolExposure {
            catalog,
            wire_log,
            roots,
            taken: RefCell::new(taken),
            children: RefCell::new(HashMap::new()),
            loading: RefCell::new(HashMap::new()),
        }
    }

    /// The entries in catalog order, each opened section followed by what it holds.
    pub fn list(&self) -> Vec<Rc<ExposedEntry>> {
        let mut listed = Vec::new();
        expand_entries(&self.roots, &self.children.borrow(), &mut listed);
        listed
    }

    pub fn find(&self, name: &str) -> Option<Rc<ExposedEntry>> {
        self.list().into_iter().find(|entry| entry.name() == name)
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
        let pending = Rc::clone(self.loading.borrow_mut().entry(key.clone()).or_default());
        let loaded = pending.get_or_init(|| self.load_children(section)).await.clone();
        self.forget_load(&key, &pending);
        let opened = loaded?;
        let tools_changed = !self.children.borrow().contains_key(&key);
        if tools_changed {
            self.children.borrow_mut().insert(key.clone(), opened.clone());
            self.wire_log
                .record("tools-changed", json!({ "section": key, "entries": opened.len() }));
        }
        Ok(OpenedSection {
            text: describe_opened_section(&key, &opened),
            tools_changed,
        })
    }

    /// A failed load is forgotten so the next call tries again; a newer load of the same section is left alone.
    fn forget_load(&self, key: &str, pending: &Rc<OnceCell<LoadedChildren>>) {
        let mut loading = self.loading.borrow_mut();
        if loading.get(key).is_some_and(|current| Rc::ptr_eq(current, pending)) {
            loading.remove(key);
        }
    }

    async fn load_children(&self, section: &ExposedSection) -> LoadedChildren {
        let server = self.catalog.find_server(&section.server_id)?;
        let groups = match section.group {
            Some(_) => Vec::new(),
            None => load_group_names(&self.catalog, server).await?,
        };
        if !groups.is_empty() {
            let mut taken = self.taken.borrow_mut();
            return Ok(groups
                .iter()
                .map(|group| Rc::new(ExposedEntry::Section(create_section(server, Some(group), &mut taken))))
                .collect());
        }
        let descriptors = load_group_tools(&self.catalog, server, section.group.as_deref()).await?;
        let mut taken = self.taken.borrow_mut();
        Ok(descriptors
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
            .collect())
    }
}
