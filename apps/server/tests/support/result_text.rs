use serde_json::Value;

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
