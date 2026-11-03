use crate::catalog::RegistryCatalog;
use crate::mcp::consts::UPSTREAM_NOT_PORTED;
use crate::mcp::exposed::tool_descriptor::ToolDescriptor;
use mcpkit_manifest::registry::RegistryServer;
use mcpkit_registry::Fetch;

/// The tools of one group, or of the whole server when it is not split, with their descriptions and schemas.
pub async fn load_group_tools<F: Fetch>(
    catalog: &RegistryCatalog<F>,
    server: &RegistryServer,
    group: Option<&str>,
) -> Result<Vec<ToolDescriptor>, String> {
    if server.upstream {
        return Err(format!("{}: {UPSTREAM_NOT_PORTED}", server.id));
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
