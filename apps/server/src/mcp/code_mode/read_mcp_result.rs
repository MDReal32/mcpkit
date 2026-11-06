use crate::mcp::code_mode::consts::FAILED_TOOL_TEXT;
use serde_json::Value;

/// An upstream MCP result as one value: its structured content, else its text joined and parsed when it is JSON, else
/// its content items as they are. An `isError` result is the error, with its text.
pub fn read_mcp_result(result: &Value) -> Result<Value, String> {
    let content = result
        .get("content")
        .and_then(Value::as_array)
        .cloned()
        .unwrap_or_default();
    let texts: Vec<&str> = content
        .iter()
        .filter(|item| item.get("type").and_then(Value::as_str) == Some("text"))
        .filter_map(|item| item.get("text").and_then(Value::as_str))
        .collect();
    if result.get("isError").and_then(Value::as_bool) == Some(true) {
        return Err(if texts.is_empty() {
            FAILED_TOOL_TEXT.to_owned()
        } else {
            texts.join("\n")
        });
    }
    if let Some(structured) = result.get("structuredContent") {
        return Ok(structured.clone());
    }
    if texts.len() != content.len() {
        return Ok(Value::Array(content));
    }
    let joined = texts.join("\n");
    Ok(match serde_json::from_str(&joined) {
        Ok(parsed) => parsed,
        Err(_not_json) => Value::String(joined),
    })
}

#[cfg(test)]
mod tests {
    use super::read_mcp_result;
    use serde_json::json;

    #[test]
    fn parses_json_text_and_keeps_plain_text() {
        let json_text = json!({ "content": [{ "type": "text", "text": "{\"a\":1}" }] });
        assert_eq!(read_mcp_result(&json_text), Ok(json!({ "a": 1 })));
        let plain = json!({ "content": [{ "type": "text", "text": "hello" }, { "type": "text", "text": "world" }] });
        assert_eq!(read_mcp_result(&plain), Ok(json!("hello\nworld")));
    }

    #[test]
    fn prefers_structured_content_and_fails_on_errors() {
        let structured = json!({ "content": [{ "type": "text", "text": "x" }], "structuredContent": { "b": 2 } });
        assert_eq!(read_mcp_result(&structured), Ok(json!({ "b": 2 })));
        let failed = json!({ "content": [{ "type": "text", "text": "boom" }], "isError": true });
        assert_eq!(read_mcp_result(&failed), Err("boom".to_owned()));
    }

    #[test]
    fn keeps_content_that_is_not_only_text() {
        let image = json!({ "content": [{ "type": "image", "data": "AA==", "mimeType": "image/png" }] });
        assert_eq!(
            read_mcp_result(&image),
            Ok(json!([{ "type": "image", "data": "AA==", "mimeType": "image/png" }]))
        );
    }
}
