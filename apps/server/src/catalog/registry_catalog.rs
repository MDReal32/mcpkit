use crate::upstream::{UpstreamServer, hydrate_upstream_server, read_tool_cache};
use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
use tokio::sync::OnceCell;
use usemcpkit_execution::CallContext;
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_manifest::tool::ToolSpec;
use usemcpkit_registry::{
    Fetch, RegistryContext, TOOL_NAME_SEPARATOR, load_group_manifest, load_groups, load_manifest,
};

/// What the server knows without downloading anything, plus a way to get one server's manifest, and the upstream
/// servers it started.
pub struct RegistryCatalog<F> {
    /// The servers being served, in index order.
    pub servers: Vec<RegistryServer>,
    context: RegistryContext<F>,
    /// What upstream servers are reached with while their tools are discovered and called.
    calls: CallContext,
    /// Per upstream server id: the server once it was hydrated; a failed hydration leaves it empty for the next call.
    upstreams: RefCell<HashMap<String, Rc<OnceCell<Rc<UpstreamServer>>>>>,
}

impl<F: Fetch> RegistryCatalog<F> {
    pub fn new(servers: Vec<RegistryServer>, context: RegistryContext<F>, calls: CallContext) -> Self {
        RegistryCatalog {
            servers,
            context,
            calls,
            upstreams: RefCell::new(HashMap::new()),
        }
    }

    pub fn find_server(&self, id: &str) -> Result<&RegistryServer, String> {
        self.servers
            .iter()
            .find(|server| server.id == id)
            .ok_or_else(|| format!("unknown server \"{id}\""))
    }

    /// The manifest holding `tool`, a tool name without the server id.
    pub async fn load_manifest(&self, id: &str, tool: &str) -> Result<Manifest, String> {
        let server = self.find_server(id)?;
        load_manifest(server, &self.context, tool)
            .await
            .map_err(|error| error.to_string())
    }

    /// The group names of a server split into parts; empty when its tools are in one manifest.
    pub async fn load_groups(&self, id: &str) -> Result<Vec<String>, String> {
        let server = self.find_server(id)?;
        load_groups(server, &self.context)
            .await
            .map_err(|error| error.to_string())
    }

    /// The manifest holding the tools of `group`; the whole manifest for a server that is not split.
    pub async fn load_group_manifest(&self, id: &str, group: Option<&str>) -> Result<Manifest, String> {
        let server = self.find_server(id)?;
        load_group_manifest(server, &self.context, group)
            .await
            .map_err(|error| error.to_string())
    }

    /// The server behind an upstream catalog server, started and asked for its tools on first use, once however many
    /// calls ask at the same time; `None` for the other servers.
    pub async fn load_upstream(&self, id: &str) -> Result<Option<Rc<UpstreamServer>>, String> {
        let server = self.find_server(id)?;
        if !server.upstream {
            return Ok(None);
        }
        let cell = Rc::clone(self.upstreams.borrow_mut().entry(id.to_owned()).or_default());
        let upstream = cell
            .get_or_try_init(|| async {
                let hydrated = hydrate_upstream_server(server, &self.context, &self.calls).await?;
                Ok::<_, String>(Rc::new(hydrated))
            })
            .await?;
        Ok(Some(Rc::clone(upstream)))
    }

    /// Whether some of a server's tools can be listed without starting anything: always for a registry server, and for
    /// an upstream once it was started in this run or its tools were cached by an earlier one, or when the manifest
    /// has tools of its own.
    pub async fn lists_tools_without_starting(&self, id: &str) -> Result<bool, String> {
        let server = self.find_server(id)?;
        if !server.upstream {
            return Ok(true);
        }
        if self.has_cached_upstream_tools(id).await? {
            return Ok(true);
        }
        self.has_own_tools(id).await
    }

    /// Whether the tools of an upstream were discovered already, in this run or an earlier one, so that listing them
    /// starts nothing.
    pub async fn has_cached_upstream_tools(&self, id: &str) -> Result<bool, String> {
        let started = self.upstreams.borrow().get(id).is_some_and(|cell| cell.initialized());
        if started {
            return Ok(true);
        }
        Ok(read_tool_cache(&self.context.dir, id).await?.is_some())
    }

    /// Whether the manifest has tools of its own, besides the ones of its upstream.
    pub async fn has_own_tools(&self, id: &str) -> Result<bool, String> {
        if !self.load_groups(id).await?.is_empty() {
            return Ok(true);
        }
        Ok(!self.load_group_manifest(id, None).await?.tools.is_empty())
    }

    /// The manifest's own tool called `tool`, with the manifest holding it; `None` when the manifest has no such tool,
    /// which for an upstream server leaves the tool to the upstream.
    pub async fn load_own_tool(&self, id: &str, tool: &str) -> Result<Option<(Manifest, ToolSpec)>, String> {
        let group = tool.split(TOOL_NAME_SEPARATOR).next().unwrap_or_default();
        let groups = self.load_groups(id).await?;
        if !groups.is_empty() && !groups.iter().any(|candidate| candidate == group) {
            return Ok(None);
        }
        let manifest = self.load_manifest(id, tool).await?;
        let found = manifest.tools.iter().find(|candidate| candidate.name == tool).cloned();
        Ok(found.map(|spec| (manifest, spec)))
    }

    /// Stops what serving started, such as upstream server processes.
    pub async fn close(&self) {
        let opened: Vec<Rc<UpstreamServer>> = self
            .upstreams
            .borrow()
            .values()
            .filter_map(|cell| cell.get().cloned())
            .collect();
        for upstream in opened {
            upstream.close().await;
        }
    }
}
