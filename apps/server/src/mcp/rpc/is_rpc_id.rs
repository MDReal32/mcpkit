use serde_json::Value;

pub fn is_rpc_id(value: &Value) -> bool {
    matches!(value, Value::Null | Value::String(_) | Value::Number(_))
}
