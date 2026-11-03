use crate::catalog::RegistryCatalog;
use crate::mcp::tools::parse_tool_id::parse_tool_id;
use crate::mcp::tools::parsed_tool_id::ParsedToolId;
use mcpkit_registry::Fetch;

/// Resolves a tool id against the catalog; the error text is written for the model to correct itself.
pub fn find_tool<F: Fetch>(catalog: &RegistryCatalog<F>, id: &str) -> Result<ParsedToolId, String> {
    let parsed = parse_tool_id(id)
        .ok_or_else(|| format!("invalid tool id \"{id}\"; expected <category>:<server>:<resource>:<action>"))?;
    catalog.find_server(&parsed.server_id)?;
    Ok(parsed)
}
