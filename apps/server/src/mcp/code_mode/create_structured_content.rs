use serde_json::Value;

/// The `structuredContent` of a run: exactly the object the function returned, uncut and unwrapped. MCP allows only an
/// object there, so a returned array, string, number or `null`, and text that is not JSON, have none and are returned
/// as `content` items instead (see `create_returned_content`).
pub fn create_structured_content(json: &str) -> Option<Value> {
    match serde_json::from_str::<Value>(json) {
        Ok(object @ Value::Object(_)) => Some(object),
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use super::create_structured_content;
    use crate::mcp::code_mode::consts::MAX_OUTPUT_CHARS;
    use serde_json::json;

    #[test]
    fn uses_a_returned_object_as_it_is() {
        assert_eq!(
            create_structured_content(r#"{"a":1,"result":2}"#),
            Some(json!({ "a": 1, "result": 2 }))
        );
    }

    #[test]
    fn never_cuts_the_object() {
        let object = json!({ "text": "x".repeat(MAX_OUTPUT_CHARS * 2) });
        assert_eq!(create_structured_content(&object.to_string()), Some(object));
    }

    #[test]
    fn has_none_for_anything_that_is_not_an_object() {
        for json in ["[1,2]", "[]", "42", "null", r#""hello""#, "not json"] {
            assert_eq!(create_structured_content(json), None, "{json}");
        }
    }
}
