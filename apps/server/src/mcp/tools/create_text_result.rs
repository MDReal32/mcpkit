use serde_json::{Value, json};

/// `isError` is only written when set, as the client reads a missing one as a success.
pub fn create_text_result(text: &str, is_error: bool) -> Value {
    let mut result = json!({ "content": [{ "type": "text", "text": text }] });
    if is_error {
        result["isError"] = json!(true);
    }
    result
}
