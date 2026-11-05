use serde_json::Value;

pub fn validate_fixed_headers(headers: Option<&Value>, location: &str) -> Vec<String> {
    let Some(headers) = headers else {
        return Vec::new();
    };
    let Some(headers) = headers.as_object() else {
        return vec![format!("{location} must be an object")];
    };
    headers
        .iter()
        .filter(|(_, value)| !value.is_string())
        .map(|(name, _)| format!("{location}.{name} must be a string"))
        .collect()
}
