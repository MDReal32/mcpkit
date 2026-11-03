use mcpkit_core::js::to_js_json;
use serde_json::Value;

/// TOML basic strings accept JSON string escapes, so `JSON.stringify` yields valid TOML for strings and arrays.
pub fn format_toml_value(value: &Value) -> Result<String, String> {
    match value {
        Value::String(_) | Value::Number(_) | Value::Bool(_) => Ok(to_js_json(value)),
        Value::Array(items) => {
            let formatted = items.iter().map(format_toml_value).collect::<Result<Vec<_>, _>>()?;
            Ok(format!("[{}]", formatted.join(", ")))
        }
        Value::Null | Value::Object(_) => Err("cannot write object to TOML".to_owned()),
    }
}
