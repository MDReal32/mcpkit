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

#[cfg(test)]
mod tests {
    use super::create_json_result;
    use serde_json::json;

    #[test]
    fn writes_pretty_json_and_leaves_out_the_text_of_nothing() {
        assert_eq!(
            create_json_result(Some(&json!({ "a": [1.0] }))),
            json!({ "content": [{ "type": "text", "text": "{\n  \"a\": [\n    1\n  ]\n}" }] })
        );
        assert_eq!(create_json_result(None), json!({ "content": [{ "type": "text" }] }));
    }
}
