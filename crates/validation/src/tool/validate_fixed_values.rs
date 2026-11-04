use serde_json::Value;

pub fn validate_fixed_values(values: Option<&Value>, location: &str) -> Vec<String> {
    let Some(values) = values else {
        return Vec::new();
    };
    let Some(values) = values.as_object() else {
        return vec![format!("{location} must be an object")];
    };
    values
        .iter()
        .filter(|(_, value)| !matches!(value, Value::String(_) | Value::Number(_) | Value::Bool(_)))
        .map(|(key, _)| format!("{location}.{key} must be a string, number or boolean"))
        .collect()
}
