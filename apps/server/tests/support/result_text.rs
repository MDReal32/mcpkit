use serde_json::Value;

/// What the items of a result hold, in order, without the console item: a `json` item's value, a `text` item's text as
/// a string.
pub fn result_values(result: &Value) -> Vec<Value> {
    let items = result["content"].as_array().map(Vec::as_slice).unwrap_or_default();
    items
        .iter()
        .filter(|item| {
            !item["text"]
                .as_str()
                .is_some_and(|text| text.starts_with("--- console ---"))
        })
        .map(|item| match item["type"].as_str() {
            Some("json") => item["json"].clone(),
            _ => item["text"].clone(),
        })
        .collect()
}

/// A result's content as one text: `text` items as they are and `json` items printed.
pub fn result_text(result: &Value) -> String {
    let items = result["content"].as_array().map(Vec::as_slice).unwrap_or_default();
    items
        .iter()
        .map(|item| match item["type"].as_str() {
            Some("json") => serde_json::to_string_pretty(&item["json"]).unwrap(),
            _ => item["text"].as_str().unwrap_or_default().to_owned(),
        })
        .collect::<Vec<_>>()
        .join("\n")
}
