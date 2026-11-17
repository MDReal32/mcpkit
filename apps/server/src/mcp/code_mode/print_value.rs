use serde_json::Value;
use usemcpkit_core::js::to_js_json_pretty;

/// A returned value as the model reads it: a string as it is, anything else as JSON printed like the other tools'
/// results.
pub fn print_value(value: &Value) -> String {
    match value {
        Value::String(text) => text.clone(),
        other => to_js_json_pretty(other),
    }
}
