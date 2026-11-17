use crate::mcp::code_mode::consts::{MAX_OUTPUT_CHARS, STRUCTURED_RESULT_KEY};
use crate::mcp::code_mode::print_value::print_value;
use serde_json::{Value, json};

/// The `structuredContent` of a run, which MCP requires to be an object: the returned value under
/// [`STRUCTURED_RESULT_KEY`]. A returned string, anything that is not JSON and a value over the output limit have none,
/// since a cut value would no longer be the value.
pub fn create_structured_content(json: &str) -> Option<Value> {
    let value = serde_json::from_str::<Value>(json).ok()?;
    if value.is_string() || print_value(&value).chars().count() > MAX_OUTPUT_CHARS {
        return None;
    }
    Some(json!({ STRUCTURED_RESULT_KEY: value }))
}

#[cfg(test)]
mod tests {
    use super::create_structured_content;
    use crate::mcp::code_mode::consts::MAX_OUTPUT_CHARS;
    use serde_json::json;

    #[test]
    fn wraps_any_json_value_in_an_object() {
        assert_eq!(create_structured_content("[1,2]"), Some(json!({ "result": [1, 2] })));
        assert_eq!(create_structured_content("42"), Some(json!({ "result": 42 })));
    }

    #[test]
    fn leaves_out_a_string_and_a_value_over_the_limit() {
        assert_eq!(create_structured_content(r#""hello""#), None);
        assert_eq!(create_structured_content("not json"), None);
        let long = format!(r#"["{}"]"#, "x".repeat(MAX_OUTPUT_CHARS));
        assert_eq!(create_structured_content(&long), None);
    }
}
