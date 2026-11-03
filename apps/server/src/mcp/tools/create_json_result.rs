use mcpkit_core::js::to_js_json_pretty;
use serde_json::{Value, json};

/// `createTextResult(JSON.stringify(value, null, 2))`. A mapping that found nothing is the TypeScript `undefined`, whose
/// `JSON.stringify` is `undefined` too, so its text item goes out without a `text`, as the TypeScript server sends it.
pub fn create_json_result(value: Option<&Value>) -> Value {
    match value {
        Some(value) => json!({ "content": [{ "type": "text", "text": to_js_json_pretty(value) }] }),
        None => json!({ "content": [{ "type": "text" }] }),
    }
}
