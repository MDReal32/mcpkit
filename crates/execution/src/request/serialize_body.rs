use crate::request::consts::TEXT_CONTENT_TYPE_PREFIX;
use mcpkit_core::js::{to_js_json, to_js_string};
use serde_json::Value;

pub fn serialize_body(payload: &Value, content_type: &str) -> String {
    if content_type.starts_with(TEXT_CONTENT_TYPE_PREFIX) {
        return to_js_string(Some(payload));
    }
    to_js_json(payload)
}
