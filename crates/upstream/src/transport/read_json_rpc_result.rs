use crate::upstream_error::UpstreamError;
use serde_json::Value;

/// The `result` of a JSON-RPC reply (null when it has none), or its `error.message` as the failure.
pub fn read_json_rpc_result(message: &Value) -> Result<Value, UpstreamError> {
    if let Some(error) = message.get("error").filter(|error| !error.is_null()) {
        let text = error.get("message").and_then(Value::as_str).unwrap_or_default();
        return Err(UpstreamError::new(text));
    }
    Ok(message.get("result").cloned().unwrap_or(Value::Null))
}
