use serde_json::{Value, json};

/// How a host function answers the prelude: `{"value": …}` or `{"error": "…"}`, which the prelude turns into a thrown
/// `Error`.
pub fn create_envelope(result: Result<Value, String>) -> String {
    match result {
        Ok(value) => json!({ "value": value }).to_string(),
        Err(error) => json!({ "error": error }).to_string(),
    }
}
