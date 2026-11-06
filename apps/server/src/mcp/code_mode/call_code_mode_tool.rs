use crate::catalog::RegistryCatalog;
use crate::mcp::code_mode::code_mode_host::CodeModeHost;
use crate::mcp::code_mode::consts::{CODE_ARGUMENT, CODE_ARGUMENT_DESCRIPTION, EXECUTE_TOOL, SEARCH_TOOL};
use crate::mcp::code_mode::create_code_result::create_code_result;
use crate::mcp::code_mode::run_code::run_code;
use crate::mcp::consts::INVALID_PARAMS;
use crate::mcp::rpc::RpcError;
use crate::mcp::tools::{create_text_result, read_tool_arguments};
use serde_json::{Map, Value};
use std::rc::Rc;
use usemcpkit_core::js::to_js_string;
use usemcpkit_execution::CallContext;
use usemcpkit_registry::Fetch;

/// Runs the code of a `search` or `execute` call; any other tool name is a protocol error.
pub async fn call_code_mode_tool<F: Fetch + 'static>(
    catalog: &Rc<RegistryCatalog<F>>,
    params: Option<&Map<String, Value>>,
    calls: &CallContext,
) -> Result<Value, RpcError> {
    let name = to_js_string(params.and_then(|params| params.get("name")));
    let allow_calls = match name.as_str() {
        SEARCH_TOOL => false,
        EXECUTE_TOOL => true,
        _ => {
            return Err(RpcError::new(
                INVALID_PARAMS,
                format!("unknown tool: {name}; the tools are {SEARCH_TOOL} and {EXECUTE_TOOL}"),
            ));
        }
    };
    let args = read_tool_arguments(params)?;
    let Some(code) = args.and_then(|args| args.get(CODE_ARGUMENT)).and_then(Value::as_str) else {
        return Ok(create_text_result(
            &format!("\"{CODE_ARGUMENT}\" must be a string: {CODE_ARGUMENT_DESCRIPTION}"),
            true,
        ));
    };
    let host = Rc::new(CodeModeHost::new(Rc::clone(catalog), calls.clone(), allow_calls));
    Ok(create_code_result(run_code(&host, code).await))
}
