use crate::catalog::RegistryCatalog;
use crate::mcp::consts::UPSTREAM_NOT_PORTED;
use crate::mcp::tools::create_json_result::create_json_result;
use crate::mcp::tools::create_text_result::create_text_result;
use crate::mcp::tools::find_tool::find_tool;
use mcpkit_execution::{CallContext, execute_tool};
use mcpkit_registry::Fetch;
use serde_json::{Map, Value};

/// Failures are returned to the model as isError results, not protocol errors.
pub async fn call_server_tool<F: Fetch>(
    catalog: &RegistryCatalog<F>,
    id: &str,
    args: Option<&Map<String, Value>>,
    context: &CallContext,
) -> Value {
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
    let Some(tool) = manifest.tools.iter().find(|candidate| candidate.name == found.tool) else {
        return create_text_result(&format!("\"{id}\" is not in the manifest of {}", found.server_id), true);
    };
    match execute_tool(&manifest, tool, args, context).await {
        Ok(value) => create_json_result(value.as_ref()),
        Err(error) => create_text_result(&error.0, true),
    }
}
