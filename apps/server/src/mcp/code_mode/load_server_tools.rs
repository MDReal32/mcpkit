use crate::catalog::RegistryCatalog;
use crate::mcp::code_mode::consts::PARALLEL_GROUP_LOADS;
use crate::mcp::code_mode::load_group_tools::load_group_tools;
use crate::mcp::code_mode::tool_descriptor::ToolDescriptor;
use futures_util::{StreamExt, TryStreamExt, stream};
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::Fetch;

/// The tools of one group, or of the whole server: a server split into groups downloads every group.
pub async fn load_server_tools<F: Fetch>(
    catalog: &RegistryCatalog<F>,
    server: &RegistryServer,
    group: Option<&str>,
) -> Result<Vec<ToolDescriptor>, String> {
    if group.is_some() || server.upstream {
        return load_group_tools(catalog, server, group).await;
    }
    let groups = catalog.load_groups(&server.id).await?;
    if groups.is_empty() {
        return load_group_tools(catalog, server, None).await;
    }
    let loaded: Vec<Vec<ToolDescriptor>> = stream::iter(
        groups
            .iter()
            .map(|group| load_group_tools(catalog, server, Some(group))),
    )
    .buffered(PARALLEL_GROUP_LOADS)
    .try_collect()
    .await?;
    Ok(loaded.into_iter().flatten().collect())
}
