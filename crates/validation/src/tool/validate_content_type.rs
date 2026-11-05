use serde_json::{Map, Value};
use usemcpkit_core::js::js_trim;

pub fn validate_content_type(request: &Map<String, Value>, location: &str) -> Vec<String> {
    let Some(content_type) = request.get("contentType") else {
        return Vec::new();
    };
    let Some(content_type) = content_type.as_str().filter(|text| !js_trim(text).is_empty()) else {
        return vec![format!("{location}.request.contentType must be a non-empty string")];
    };
    let has_body_arg = request.contains_key("bodyArg");
    if content_type.starts_with("text/") && !has_body_arg {
        return vec![format!(
            "{location}.request.contentType {content_type} requires bodyArg"
        )];
    }
    if content_type == "multipart/form-data" && has_body_arg {
        return vec![format!(
            "{location}.request.contentType {content_type} cannot be combined with bodyArg"
        )];
    }
    Vec::new()
}
