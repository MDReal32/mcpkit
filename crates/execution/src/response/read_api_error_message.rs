use serde_json::Value;
use usemcpkit_core::js::to_js_string;

pub fn read_api_error_message(body: &Value) -> String {
    if let Some(message) = body.as_object().and_then(|object| object.get("message")) {
        return to_js_string(Some(message));
    }
    match body {
        Value::Null => String::new(),
        body => to_js_string(Some(body)),
    }
}

#[cfg(test)]
mod tests {
    use super::read_api_error_message;
    use serde_json::json;

    #[test]
    fn prefers_the_message_field() {
        assert_eq!(read_api_error_message(&json!({ "message": "Not Found" })), "Not Found");
        assert_eq!(read_api_error_message(&json!({ "message": null })), "null");
        assert_eq!(read_api_error_message(&json!("plain")), "plain");
        assert_eq!(read_api_error_message(&json!({ "error": 1 })), "[object Object]");
        assert_eq!(read_api_error_message(&json!(null)), "");
    }
}
