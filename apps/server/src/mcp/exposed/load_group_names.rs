use crate::catalog::RegistryCatalog;
use crate::mcp::consts::UPSTREAM_NOT_PORTED;
use mcpkit_manifest::registry::RegistryServer;
use mcpkit_registry::Fetch;

/// The groups a server opens into: its parts for a server split into files. Empty when its tools are not grouped.
pub async fn load_group_names<F: Fetch>(
    catalog: &RegistryCatalog<F>,
    server: &RegistryServer,
) -> Result<Vec<String>, String> {
    if server.upstream {
        return Err(format!("{}: {UPSTREAM_NOT_PORTED}", server.id));
    }
    catalog.load_groups(&server.id).await
}
