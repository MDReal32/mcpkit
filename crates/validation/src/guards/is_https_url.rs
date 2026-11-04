use serde_json::Value;

pub fn is_https_url(value: Option<&Value>) -> bool {
    value
        .and_then(Value::as_str)
        .is_some_and(|text| text.starts_with("https://"))
}
