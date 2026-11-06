use crate::catalog::RegistryCatalog;
use crate::mcp::code_mode::load_upstream_tools::load_upstream_tools;
use crate::mcp::code_mode::tool_descriptor::ToolDescriptor;
use crate::mcp::consts::TOOL_ID_SEPARATOR;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::Fetch;

/// The tools of one group, or of the whole server when it is not split, with their descriptions and schemas.
pub async fn load_group_tools<F: Fetch>(
    catalog: &RegistryCatalog<F>,
    server: &RegistryServer,
    group: Option<&str>,
) -> Result<Vec<ToolDescriptor>, String> {
    if server.upstream {
        let tools = load_upstream_tools(catalog, server).await?;
        return Ok(match group {
            Some(group) => tools
                .into_iter()
                .filter(|found| found.tool.split(TOOL_ID_SEPARATOR).next() == Some(group))
                .collect(),
            None => tools,
        });
    }
    let manifest = catalog.load_group_manifest(&server.id, group).await?;
    Ok(manifest
        .tools
        .into_iter()
        .map(|spec| ToolDescriptor {
            tool: spec.name,
            description: spec.description,
            input_schema: spec.input,
        })
        .collect())
}
