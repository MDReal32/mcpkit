use serde_json::Value;

/// The strings of a JSON array, such as `consumes`; none when it is absent.
pub fn read_strings(value: Option<&Value>) -> Vec<String> {
    value
        .and_then(Value::as_array)
        .map(|items| items.iter().filter_map(Value::as_str).map(str::to_owned).collect())
        .unwrap_or_default()
}
