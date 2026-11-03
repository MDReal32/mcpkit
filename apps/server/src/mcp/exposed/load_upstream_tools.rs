use crate::catalog::RegistryCatalog;
use crate::mcp::exposed::empty_input_schema::empty_input_schema;
use crate::mcp::exposed::tool_descriptor::ToolDescriptor;
use mcpkit_manifest::registry::RegistryServer;
use mcpkit_registry::Fetch;

/// Every tool of an upstream server, which starts it (and clones its repository) the first time.
pub async fn load_upstream_tools<F: Fetch>(
    catalog: &RegistryCatalog<F>,
    server: &RegistryServer,
) -> Result<Vec<ToolDescriptor>, String> {
    let Some(upstream) = catalog.load_upstream(&server.id).await? else {
        return Ok(Vec::new());
    };
    Ok(upstream
        .tools
        .values()
        .map(|found| ToolDescriptor {
            tool: found.name.clone(),
            description: found.description.clone().unwrap_or_default(),
            input_schema: found.input_schema.clone().unwrap_or_else(empty_input_schema),
        })
        .collect())
}
