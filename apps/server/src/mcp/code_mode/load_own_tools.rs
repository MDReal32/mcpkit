use crate::catalog::RegistryCatalog;
use crate::mcp::code_mode::consts::PARALLEL_GROUP_LOADS;
use crate::mcp::code_mode::describe_tools::describe_tools;
use crate::mcp::code_mode::filter_by_group::filter_by_group;
use crate::mcp::code_mode::tool_descriptor::ToolDescriptor;
use futures_util::{StreamExt, TryStreamExt, stream};
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::Fetch;

/// The tools the manifest itself defines, of one group or of the whole server: a server split into groups downloads
/// every group. Empty for a manifest that only fronts an upstream, and for a group it has no tools in when its
/// upstream may have some.
pub async fn load_own_tools<F: Fetch>(
    catalog: &RegistryCatalog<F>,
    server: &RegistryServer,
    group: Option<&str>,
) -> Result<Vec<ToolDescriptor>, String> {
    let groups = catalog.load_groups(&server.id).await?;
    if groups.is_empty() {
        let whole = describe_tools(catalog.load_group_manifest(&server.id, None).await?.tools);
        return Ok(if server.upstream {
            filter_by_group(whole, group)
        } else {
            whole
        });
    }
    if let Some(group) = group {
        if server.upstream && !groups.iter().any(|candidate| candidate == group) {
            return Ok(Vec::new());
        }
        return Ok(describe_tools(
            catalog.load_group_manifest(&server.id, Some(group)).await?.tools,
        ));
    }
    let loaded: Vec<Vec<ToolDescriptor>> = stream::iter(groups.iter().map(|group| async move {
        let manifest = catalog.load_group_manifest(&server.id, Some(group)).await?;
        Ok::<_, String>(describe_tools(manifest.tools))
    }))
    .buffered(PARALLEL_GROUP_LOADS)
    .try_collect()
    .await?;
    Ok(loaded.into_iter().flatten().collect())
}
