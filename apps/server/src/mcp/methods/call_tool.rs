use crate::catalog::RegistryCatalog;
use crate::mcp::consts::INVALID_PARAMS;
use crate::mcp::exposed::{ExposedEntry, ToolExposure};
use crate::mcp::methods::method_outcome::MethodOutcome;
use crate::mcp::rpc::RpcError;
use crate::mcp::tools::{call_server_tool, create_text_result, create_tool_id, read_tool_arguments};
use mcpkit_core::js::to_js_string;
use mcpkit_registry::Fetch;
use serde_json::{Map, Value};

/// Calling a section opens it; calling a tool runs it. Only a name the list does not hold is a protocol error.
pub async fn call_tool<F: Fetch>(
    catalog: &RegistryCatalog<F>,
    exposure: &ToolExposure<F>,
    params: Option<&Map<String, Value>>,
) -> Result<MethodOutcome, RpcError> {
    let name = to_js_string(params.and_then(|params| params.get("name")));
    let Some(found) = exposure.find(&name) else {
        return Err(RpcError::new(
            INVALID_PARAMS,
            format!("unknown tool: {name}; open its section first, the tool list shows the sections"),
        ));
    };
    match &*found {
        ExposedEntry::Section(section) => Ok(match exposure.open(section).await {
            Ok(opened) => MethodOutcome {
                result: create_text_result(&opened.text, false),
                tools_changed: opened.tools_changed,
            },
            Err(error) => MethodOutcome::unchanged(create_text_result(
                &format!("could not open {}: {error}", section.name),
                true,
            )),
        }),
        ExposedEntry::Tool(tool) => {
            read_tool_arguments(params)?;
            let id = create_tool_id(&tool.server_id, &tool.tool);
            Ok(MethodOutcome::unchanged(call_server_tool(catalog, &id).await))
        }
    }
}
