use crate::js::to_js_numbers::to_js_numbers;
use serde_json::Value;

/// `JSON.stringify(value, null, 2)`, with numbers written as JavaScript writes them.
pub fn to_js_json_pretty(value: &Value) -> String {
    format!("{:#}", to_js_numbers(value.clone()))
}
