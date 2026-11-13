use crate::args::ArgValue;
use crate::auth_fallback::{AcceptedAuthAttempt, send_with_auth_fallback};
use crate::mapping::map_response;
use crate::request::{load_file_args, prepare_tool_args};
use crate::response::{read_api_error_message, read_response_body, save_response_file};
use crate::{CallContext, ToolError};
use serde_json::{Map, Value};
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::tool::ToolSpec;

/// Runs one tool call: its arguments, the auth that works, the request and the mapped response. `None` is the
/// TypeScript `undefined`, a response mapping that found nothing.
pub async fn execute_tool(
    manifest: &Manifest,
    tool: &ToolSpec,
    raw_args: Option<&Map<String, Value>>,
    context: &CallContext,
) -> Result<Option<Value>, ToolError> {
    let args = load_file_args(tool, prepare_tool_args(tool, raw_args)?).await?;
    let AcceptedAuthAttempt {
        response,
        tool: sent_tool,
        ..
    } = send_with_auth_fallback(manifest, tool, &args, context).await?;
    if let Some(save_to_arg) = &sent_tool.request.save_to_arg
        && response.is_ok()
    {
        let path = args.get(save_to_arg).map(ArgValue::to_json);
        return save_response_file(&response, path.as_ref()).await.map(Some);
    }
    let body = read_response_body(&response)?;
    if !response.is_ok() {
        let message = format!(
            "{} API {}: {}",
            manifest.name,
            response.status,
            read_api_error_message(&body)
        );
        return Err(ToolError(message.trim().to_owned()));
    }
    Ok(map_response(Some(body), sent_tool.response.as_ref()))
}
