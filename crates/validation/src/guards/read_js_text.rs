use serde_json::Value;
use usemcpkit_core::js::to_js_string;

/// `String(value ?? "")`.
pub fn read_js_text(value: Option<&Value>) -> String {
    match value {
        None | Some(Value::Null) => String::new(),
        value => to_js_string(value),
    }
}
