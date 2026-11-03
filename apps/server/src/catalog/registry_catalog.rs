use mcpkit_manifest::Manifest;
use mcpkit_manifest::registry::RegistryServer;
use mcpkit_registry::{Fetch, RegistryContext, load_group_manifest, load_groups, load_manifest};

/// What the server knows without downloading anything, plus a way to get one server's manifest.
pub struct RegistryCatalog<F> {
    /// The servers being served, in index order.
    pub servers: Vec<RegistryServer>,
    context: RegistryContext<F>,
}

impl<F: Fetch> RegistryCatalog<F> {
    pub fn new(servers: Vec<RegistryServer>, context: RegistryContext<F>) -> Self {
        RegistryCatalog { servers, context }
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
}
