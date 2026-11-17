use crate::mcp::code_mode::consts::MAX_OUTPUT_CHARS;
use crate::mcp::code_mode::format_returned_json::format_returned_json;
use crate::mcp::code_mode::truncate_output::truncate_output;
use crate::mcp::tools::create_text_content;
use serde_json::{Value, json};

/// The content item for what the function returned: a string as `text`, any other value as a `json` item holding the
/// value itself. A value whose JSON is longer than the output limit is cut as `text`, since JSON cannot be cut.
pub fn create_returned_content(json: &str) -> Value {
    match serde_json::from_str::<Value>(json) {
        Ok(Value::String(text)) => create_text_content(&truncate_output(text)),
        Ok(value) => {
            let printed = format_returned_json(json);
            if printed.chars().count() > MAX_OUTPUT_CHARS {
                return create_text_content(&truncate_output(printed));
            }
            json!({ "type": "json", "json": value })
        }
        Err(_unparsed) => create_text_content(&truncate_output(json.to_owned())),
    }
}

#[cfg(test)]
mod tests {
    use super::create_returned_content;
    use crate::mcp::code_mode::consts::{MAX_OUTPUT_CHARS, TRUNCATED_MARKER};
    use serde_json::json;

    #[test]
    fn returns_objects_numbers_and_arrays_as_json_items() {
        assert_eq!(
            create_returned_content(r#"{"a":[1,2]}"#),
            json!({ "type": "json", "json": { "a": [1, 2] } })
        );
        assert_eq!(create_returned_content("42"), json!({ "type": "json", "json": 42 }));
    }

    #[test]
    fn returns_a_string_as_text() {
        assert_eq!(
            create_returned_content(r#""hello""#),
            json!({ "type": "text", "text": "hello" })
        );
    }

    #[test]
    fn cuts_json_longer_than_the_limit_as_text() {
        let long = format!(r#"["{}"]"#, "x".repeat(MAX_OUTPUT_CHARS));
        let item = create_returned_content(&long);
        assert_eq!(item["type"], "text");
        assert!(
            item["text"]
                .as_str()
                .is_some_and(|text| text.contains(TRUNCATED_MARKER))
        );
    }
}
