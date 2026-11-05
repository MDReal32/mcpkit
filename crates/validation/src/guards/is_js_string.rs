use serde_json::Value;

/// `typeof value === "string"`.
pub fn is_js_string(value: Option<&Value>) -> bool {
    matches!(value, Some(Value::String(_)))
}
