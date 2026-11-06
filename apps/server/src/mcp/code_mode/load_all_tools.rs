use crate::catalog::RegistryCatalog;
use crate::mcp::code_mode::consts::PARALLEL_SERVER_LOADS;
use crate::mcp::code_mode::load_server_tools::load_server_tools;
use crate::mcp::code_mode::server_tool::ServerTool;
use futures_util::{StreamExt, TryStreamExt, stream};
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::Fetch;

/// Every tool of every server that can be listed without starting anything: an upstream server is left out until it
/// was started once and its tools are cached.
pub async fn load_all_tools<F: Fetch>(catalog: &RegistryCatalog<F>) -> Result<Vec<ServerTool>, String> {
    let mut listed: Vec<&RegistryServer> = Vec::new();
    for server in &catalog.servers {
        if catalog.lists_tools_without_starting(&server.id).await? {
            listed.push(server);
        }
    }
    let loaded: Vec<Vec<ServerTool>> = stream::iter(listed.into_iter().map(|server| async move {
        let tools = load_server_tools(catalog, server, None).await?;
        Ok::<_, String>(
            tools
                .into_iter()
                .map(|descriptor| ServerTool {
                    server_id: server.id.clone(),
                    descriptor,
                })
                .collect(),
        )
    }))
    .buffered(PARALLEL_SERVER_LOADS)
    .try_collect()
    .await?;
    Ok(loaded.into_iter().flatten().collect())
}
