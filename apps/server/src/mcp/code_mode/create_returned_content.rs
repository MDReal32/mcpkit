use crate::mcp::code_mode::create_element_items::create_element_items;
use crate::mcp::code_mode::create_value_item::create_value_item;
use crate::mcp::code_mode::truncate_output::truncate_output;
use crate::mcp::tools::create_text_content;
use serde_json::Value;

/// The content items for what the function returned: one item per element of a non-empty array (see
/// `create_element_items`), a single item for any other value (see `create_value_item`), and the text itself when the
/// sandbox wrote something that is not JSON.
pub fn create_returned_content(json: &str) -> Vec<Value> {
    match serde_json::from_str::<Value>(json) {
        Ok(Value::Array(elements)) if !elements.is_empty() => create_element_items(elements),
        Ok(value) => vec![create_value_item(value)],
        Err(_unparsed) => vec![create_text_content(&truncate_output(json.to_owned()))],
    }
}

#[cfg(test)]
mod tests {
    use super::create_returned_content;
    use serde_json::json;

    #[test]
    fn returns_objects_and_numbers_as_one_json_item() {
        assert_eq!(
            create_returned_content(r#"{"a":[1,2]}"#),
            vec![json!({ "type": "json", "json": { "a": [1, 2] } })]
        );
        assert_eq!(
            create_returned_content("42"),
            vec![json!({ "type": "json", "json": 42 })]
        );
    }

    #[test]
    fn returns_a_string_as_text() {
        assert_eq!(
            create_returned_content(r#""hello""#),
            vec![json!({ "type": "text", "text": "hello" })]
        );
    }

    #[test]
    fn spreads_an_array_over_one_item_per_element() {
        assert_eq!(
            create_returned_content(r#"[{"id":"a"},"b"]"#),
            vec![
                json!({ "type": "json", "json": { "id": "a" } }),
                json!({ "type": "text", "text": "b" }),
            ]
        );
    }

    #[test]
    fn keeps_an_empty_array_as_one_json_item() {
        assert_eq!(
            create_returned_content("[]"),
            vec![json!({ "type": "json", "json": [] })]
        );
    }
}
