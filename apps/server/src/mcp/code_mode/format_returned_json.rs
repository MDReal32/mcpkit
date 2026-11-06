use serde_json::Value;
use usemcpkit_core::js::to_js_json_pretty;

/// The JSON the sandbox wrote, printed again so its numbers and indentation match the other tools' results.
pub fn format_returned_json(json: &str) -> String {
    match serde_json::from_str::<Value>(json) {
        Ok(value) => to_js_json_pretty(&value),
        Err(_unparsed) => json.to_owned(),
    }
}
