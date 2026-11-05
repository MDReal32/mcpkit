use crate::upstream::{UpstreamServer, hydrate_upstream_server};
use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
use tokio::sync::OnceCell;
use usemcpkit_execution::CallContext;
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::{Fetch, RegistryContext, load_group_manifest, load_groups, load_manifest};

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
