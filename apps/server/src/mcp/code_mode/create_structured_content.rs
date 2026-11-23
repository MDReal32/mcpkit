use crate::mcp::code_mode::consts::STRUCTURED_RESULT_KEY;
use serde_json::{Value, json};

/// The `structuredContent` of a run: the value the function returned, exactly as returned and uncut, under
/// [`STRUCTURED_RESULT_KEY`], since MCP requires `structuredContent` to be an object whatever the value is. Text from
/// the sandbox that is not JSON is that text as a string.
pub fn create_structured_content(json: &str) -> Value {
    let value = serde_json::from_str(json).unwrap_or_else(|_not_json| Value::String(json.to_owned()));
    json!({ STRUCTURED_RESULT_KEY: value })
}

#[cfg(test)]
mod tests {
    use super::create_structured_content;
    use crate::mcp::code_mode::consts::MAX_OUTPUT_CHARS;
    use serde_json::json;

    #[test]
    fn puts_the_returned_value_under_result_as_it_is() {
        assert_eq!(
            create_structured_content(r#"{"a":1,"result":2}"#),
            json!({ "result": { "a": 1, "result": 2 } })
        );
        assert_eq!(create_structured_content("[1,2]"), json!({ "result": [1, 2] }));
        assert_eq!(create_structured_content("42"), json!({ "result": 42 }));
        assert_eq!(create_structured_content("null"), json!({ "result": null }));
        assert_eq!(create_structured_content(r#""hello""#), json!({ "result": "hello" }));
    }

    #[test]
    fn never_cuts_the_value() {
        let value = json!({ "text": "x".repeat(MAX_OUTPUT_CHARS * 2) });
        assert_eq!(
            create_structured_content(&value.to_string()),
            json!({ "result": value })
        );
    }

    #[test]
    fn keeps_text_that_is_not_json_as_a_string() {
        assert_eq!(create_structured_content("not json"), json!({ "result": "not json" }));
    }
}
