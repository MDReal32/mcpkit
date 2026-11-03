use crate::catalog::RegistryCatalog;
use crate::mcp::consts::{TOOL_CALLS_NOT_PORTED, UPSTREAM_NOT_PORTED};
use crate::mcp::tools::create_text_result::create_text_result;
use crate::mcp::tools::find_tool::find_tool;
use mcpkit_registry::Fetch;
use serde_json::Value;

/// Failures are returned to the model as isError results, not protocol errors. Running the request is not ported yet,
/// so a tool that resolves is answered with that.
pub async fn call_server_tool<F: Fetch>(catalog: &RegistryCatalog<F>, id: &str) -> Value {
    let found = match find_tool(catalog, id) {
        Ok(found) => found,
        Err(error) => return create_text_result(&error, true),
    };
    if catalog
        .find_server(&found.server_id)
        .is_ok_and(|server| server.upstream)
    {
        return create_text_result(&format!("{id}: {UPSTREAM_NOT_PORTED}"), true);
    }
    let manifest = match catalog.load_manifest(&found.server_id, &found.tool).await {
        Ok(manifest) => manifest,
        Err(error) => return create_text_result(&error, true),
    };
    if !manifest.tools.iter().any(|candidate| candidate.name == found.tool) {
        return create_text_result(&format!("\"{id}\" is not in the manifest of {}", found.server_id), true);
    }
    create_text_result(&format!("{id}: {TOOL_CALLS_NOT_PORTED}"), true)
}
