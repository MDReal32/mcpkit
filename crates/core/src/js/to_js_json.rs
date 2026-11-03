use crate::js::to_js_numbers::to_js_numbers;
use serde_json::Value;

/// `JSON.stringify(value)`, with numbers written as JavaScript writes them.
pub fn to_js_json(value: &Value) -> String {
    to_js_numbers(value.clone()).to_string()
}
