use crate::mcp::code_mode::consts::{MAX_OUTPUT_CHARS, TRUNCATED_MARKER};
use crate::mcp::code_mode::create_value_item::create_value_item;
use crate::mcp::code_mode::print_value::print_value;
use crate::mcp::tools::create_text_content;
use serde_json::Value;

/// One `text` content item per element of a returned array, in order, until the output limit is reached; the items
/// left out are named in a closing `text` item. An array whose first element alone is over the limit comes back as one
/// item.
pub fn create_element_items(elements: Vec<Value>) -> Vec<Value> {
    let lengths: Vec<usize> = elements
        .iter()
        .map(|element| print_value(element).chars().count())
        .collect();
    let total: usize = lengths.iter().sum();
    if total <= MAX_OUTPUT_CHARS {
        return elements.iter().map(create_value_item).collect();
    }
    let count = elements.len();
    let mut used = 0;
    let mut items = Vec::new();
    for (element, length) in elements.iter().zip(&lengths) {
        if used + length > MAX_OUTPUT_CHARS {
            break;
        }
        used += length;
        items.push(create_value_item(element));
    }
    if items.is_empty() {
        return vec![create_value_item(&Value::Array(elements))];
    }
    items.push(create_text_content(&format!(
        "{TRUNCATED_MARKER}\nShowing {shown} of {count} items; the whole array was {total} characters. Return less, for example by filtering or picking fields in the code.",
        shown = items.len(),
    )));
    items
}

#[cfg(test)]
mod tests {
    use super::create_element_items;
    use crate::mcp::code_mode::consts::{MAX_OUTPUT_CHARS, TRUNCATED_MARKER};
    use serde_json::json;

    #[test]
    fn makes_one_text_item_per_element() {
        assert_eq!(
            create_element_items(vec![json!({ "a": 1 }), json!("note"), json!(3)]),
            vec![
                json!({ "type": "text", "text": "{\n  \"a\": 1\n}" }),
                json!({ "type": "text", "text": "note" }),
                json!({ "type": "text", "text": "3" }),
            ]
        );
    }

    #[test]
    fn stops_at_the_limit_and_names_what_was_left_out() {
        let element = json!({ "text": "x".repeat(MAX_OUTPUT_CHARS / 4) });
        let items = create_element_items(vec![element; 10]);
        assert_eq!(items.len(), 4);
        let notice = items[3]["text"].as_str().unwrap();
        assert!(notice.starts_with(TRUNCATED_MARKER), "{notice}");
        assert!(notice.contains("Showing 3 of 10 items"), "{notice}");
    }

    #[test]
    fn cuts_one_huge_first_element_as_a_single_text_item() {
        let items = create_element_items(vec![json!("x".repeat(MAX_OUTPUT_CHARS + 1)), json!(1)]);
        assert_eq!(items.len(), 1);
        assert!(items[0]["text"].as_str().unwrap().contains(TRUNCATED_MARKER));
    }
}
