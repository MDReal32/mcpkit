use crate::ToolError;
use crate::response::consts::JSON_CONTENT_TYPE_MARKER;
use mcpkit_http::HttpResponse;
use serde_json::Value;

/// An empty body is `null`, a JSON one is parsed, any other is its text.
pub fn read_response_body(response: &HttpResponse) -> Result<Value, ToolError> {
    let text = response.text();
    if text.is_empty() {
        return Ok(Value::Null);
    }
    let is_json = response
        .content_type
        .as_deref()
        .is_some_and(|content_type| content_type.contains(JSON_CONTENT_TYPE_MARKER));
    if !is_json {
        return Ok(Value::String(text));
    }
    serde_json::from_str(&text).map_err(|error| ToolError(format!("Cannot parse the response as JSON: {error}")))
}

#[cfg(test)]
mod tests {
    use super::read_response_body;
    use mcpkit_http::HttpResponse;
    use serde_json::json;

    fn response(content_type: Option<&str>, body: &[u8]) -> HttpResponse {
        HttpResponse {
            status: 200,
            content_type: content_type.map(str::to_owned),
            headers: Vec::new(),
            body: body.to_vec(),
        }
    }

    #[test]
    fn reads_json_text_and_empty_bodies() {
        let json_body = response(Some("application/json; charset=utf-8"), b"\xEF\xBB\xBF{\"a\":1}");

        assert_eq!(read_response_body(&json_body).unwrap(), json!({ "a": 1 }));
        assert_eq!(
            read_response_body(&response(Some("text/plain"), b"hi")).unwrap(),
            json!("hi")
        );
        assert_eq!(read_response_body(&response(None, b"{}")).unwrap(), json!("{}"));
        assert_eq!(
            read_response_body(&response(Some("application/json"), b"")).unwrap(),
            json!(null)
        );
    }

    #[test]
    fn fails_on_a_json_body_that_does_not_parse() {
        assert!(read_response_body(&response(Some("application/json"), b"{")).is_err());
    }
}
