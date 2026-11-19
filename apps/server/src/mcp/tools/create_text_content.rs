use serde_json::{Value, json};

/// One `text` item of a result's `content` array.
pub fn create_text_content(text: &str) -> Value {
    json!({ "type": "text", "text": text })
}
