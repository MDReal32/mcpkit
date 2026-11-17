use serde_json::Value;

const CONSOLE_HEADING: &str = "--- console ---";

fn text_items(result: &Value) -> Vec<&str> {
    let items = result["content"].as_array().map(Vec::as_slice).unwrap_or_default();
    items.iter().filter_map(|item| item["text"].as_str()).collect()
}

/// What a run returned: the elements of an array in `structuredContent`, the value of any other `structuredContent`,
/// or the `text` items after the console when there is none (a returned string).
pub fn result_values(result: &Value) -> Vec<Value> {
    match &result["structuredContent"]["result"] {
        Value::Null => text_items(result)
            .into_iter()
            .filter(|text| !text.starts_with(CONSOLE_HEADING))
            .map(|text| Value::String(text.to_owned()))
            .collect(),
        Value::Array(elements) => elements.clone(),
        value => vec![value.clone()],
    }
}

/// Every `text` item of a result as one text.
pub fn result_text(result: &Value) -> String {
    text_items(result).join("\n")
}
