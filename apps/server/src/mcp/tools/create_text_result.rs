use crate::mcp::consts::RESULT_TYPE_COMPLETE;
use crate::mcp::tools::create_text_content::create_text_content;
use serde_json::{Value, json};

/// `isError` is only written when set, as the client reads a missing one as a success.
pub fn create_text_result(text: &str, is_error: bool) -> Value {
    let mut result = json!({ "content": [create_text_content(text)], "resultType": RESULT_TYPE_COMPLETE });
    if is_error {
        result["isError"] = json!(true);
    }
    result
}
