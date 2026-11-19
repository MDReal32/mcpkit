use serde_json::Value;

/// What a run returned, from its `structuredContent`: the elements of a returned array, the value alone otherwise, and
/// nothing when the run returned nothing.
pub fn result_values(result: &Value) -> Vec<Value> {
    match result.get("structuredContent") {
        Some(Value::Array(elements)) => elements.clone(),
        Some(value) => vec![value.clone()],
        None => Vec::new(),
    }
}

/// Every `text` item of a result as one text, followed by its `structuredContent`: a string as it is, anything else
/// printed as JSON.
pub fn result_text(result: &Value) -> String {
    let items = result["content"].as_array().map(Vec::as_slice).unwrap_or_default();
    let mut parts: Vec<String> = items
        .iter()
        .filter_map(|item| item["text"].as_str())
        .map(str::to_owned)
        .collect();
    match result.get("structuredContent") {
        Some(Value::String(text)) => parts.push(text.clone()),
        Some(value) => parts.push(serde_json::to_string_pretty(value).unwrap()),
        None => {}
    }
    parts.join("\n")
}
