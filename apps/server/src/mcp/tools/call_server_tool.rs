use crate::catalog::RegistryCatalog;
use crate::mcp::tools::create_json_result::create_json_result;
use crate::mcp::tools::create_text_result::create_text_result;
use crate::mcp::tools::find_tool::find_tool;
use serde_json::{Map, Value};
use usemcpkit_execution::{CallContext, execute_tool};
use usemcpkit_registry::Fetch;

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
    match catalog.load_upstream(&found.server_id).await {
        Ok(Some(upstream)) => {
            let Some(discovered) = upstream.tools.get(&found.tool) else {
                return create_text_result(&format!("\"{id}\" is not on {}", found.server_id), true);
            };
            return match upstream.call(discovered, args).await {
                Ok(result) => result,
                Err(error) => create_text_result(error.message(), true),
            };
        }
        Ok(None) => {}
        Err(error) => return create_text_result(&error, true),
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
