use crate::catalog::RegistryCatalog;
use crate::mcp::code_mode::load_upstream_tools::load_upstream_tools;
use crate::mcp::consts::TOOL_ID_SEPARATOR;
use crate::upstream::MIN_SEGMENTS_TO_GROUP;
use indexmap::IndexSet;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::Fetch;

/// The groups a server opens into: its parts for a server split into files, the first name segments for an upstream
/// whose tools are all named `<group>:<resource>:<action>`. Empty when its tools are not grouped.
pub async fn load_group_names<F: Fetch>(
    catalog: &RegistryCatalog<F>,
    server: &RegistryServer,
) -> Result<Vec<String>, String> {
    if !server.upstream {
        return catalog.load_groups(&server.id).await;
    }
    let tools = load_upstream_tools(catalog, server).await?;
    let grouped = !tools.is_empty()
        && tools
            .iter()
            .all(|found| found.tool.split(TOOL_ID_SEPARATOR).count() >= MIN_SEGMENTS_TO_GROUP);
    if !grouped {
        return Ok(Vec::new());
    }
    let groups: IndexSet<String> = tools
        .iter()
        .map(|found| {
            found
                .tool
                .split(TOOL_ID_SEPARATOR)
                .next()
                .unwrap_or_default()
                .to_owned()
        })
        .collect();
    Ok(groups.into_iter().collect())
}
