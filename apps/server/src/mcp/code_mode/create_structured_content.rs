use serde_json::Value;

/// The `structuredContent` of a run: exactly the value the function returned, uncut and unwrapped, whatever its type.
/// Text from the sandbox that is not JSON is that text as a string.
pub fn create_structured_content(json: &str) -> Value {
    serde_json::from_str(json).unwrap_or_else(|_not_json| Value::String(json.to_owned()))
}

#[cfg(test)]
mod tests {
    use super::create_structured_content;
    use crate::mcp::code_mode::consts::MAX_OUTPUT_CHARS;
    use serde_json::json;

    #[test]
    fn uses_the_returned_value_as_it_is() {
        assert_eq!(
            create_structured_content(r#"{"a":1,"result":2}"#),
            json!({ "a": 1, "result": 2 })
        );
        assert_eq!(create_structured_content("[1,2]"), json!([1, 2]));
        assert_eq!(create_structured_content("42"), json!(42));
        assert_eq!(create_structured_content("null"), json!(null));
        assert_eq!(create_structured_content(r#""hello""#), json!("hello"));
    }

    #[test]
    fn never_cuts_the_value() {
        let value = json!({ "text": "x".repeat(MAX_OUTPUT_CHARS * 2) });
        assert_eq!(create_structured_content(&value.to_string()), value);
    }

    #[test]
    fn keeps_text_that_is_not_json_as_a_string() {
        assert_eq!(create_structured_content("not json"), json!("not json"));
    }
}
