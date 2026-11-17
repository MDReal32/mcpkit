use serde_json::Value;

const CONSOLE_HEADING: &str = "--- console ---";

fn text_items(result: &Value) -> Vec<&str> {
    let items = result["content"].as_array().map(Vec::as_slice).unwrap_or_default();
    items.iter().filter_map(|item| item["text"].as_str()).collect()
}

/// What a run returned: the `structuredContent` object when there is one, else the `text` items after the console, each
/// parsed as JSON when it is (an element of an array, printed) and kept as a string when it is not; a lone `[]` is an
/// empty array.
pub fn result_values(result: &Value) -> Vec<Value> {
    if let Some(object) = result.get("structuredContent") {
        return vec![object.clone()];
    }
    let values: Vec<Value> = text_items(result)
        .into_iter()
        .filter(|text| !text.starts_with(CONSOLE_HEADING))
        .map(|text| serde_json::from_str(text).unwrap_or_else(|_| Value::String(text.to_owned())))
        .collect();
    match values.as_slice() {
        [Value::Array(elements)] if elements.is_empty() => Vec::new(),
        _ => values,
    }
}

/// Every `text` item of a result as one text, followed by its `structuredContent` printed as JSON when it has one.
pub fn result_text(result: &Value) -> String {
    let mut parts: Vec<String> = text_items(result).into_iter().map(str::to_owned).collect();
    if let Some(object) = result.get("structuredContent") {
        parts.push(serde_json::to_string_pretty(object).unwrap());
    }
    parts.join("\n")
}
