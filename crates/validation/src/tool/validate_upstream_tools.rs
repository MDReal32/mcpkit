use serde_json::Value;

pub fn validate_upstream_tools(tools: Option<&Value>) -> Vec<String> {
    if tools.and_then(Value::as_array).is_some_and(Vec::is_empty) {
        return Vec::new();
    }
    vec!["tools must be empty when the manifest has an upstream".to_owned()]
}
