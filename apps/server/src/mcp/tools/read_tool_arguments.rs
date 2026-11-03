use crate::mcp::consts::INVALID_PARAMS;
use crate::mcp::rpc::RpcError;
use serde_json::{Map, Value};

pub fn read_tool_arguments(params: Option<&Map<String, Value>>) -> Result<Option<&Map<String, Value>>, RpcError> {
    match params.and_then(|params| params.get("arguments")) {
        None => Ok(None),
        Some(Value::Object(arguments)) => Ok(Some(arguments)),
        Some(_) => Err(RpcError::new(INVALID_PARAMS, "tool arguments must be an object")),
    }
}
