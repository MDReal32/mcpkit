use crate::document::consts::SWAGGER2_PARAMETER_FIELDS;
use serde_json::{Map, Value};

/// A Swagger 2.0 path, query or header parameter as OpenAPI 3: its type fields move into `schema`, and an array is
/// exploded only for `collectionFormat: multi` (`csv`, the default, is one comma-separated value).
pub fn upgrade_swagger2_parameter(parameter: &Map<String, Value>) -> Value {
    let mut upgraded = Map::new();
    for key in ["name", "in", "required", "description"] {
        if let Some(value) = parameter.get(key) {
            upgraded.insert(key.to_owned(), value.clone());
        }
    }
    let schema: Map<String, Value> = parameter
        .iter()
        .filter(|(key, _)| !SWAGGER2_PARAMETER_FIELDS.contains(&key.as_str()) && !key.starts_with("x-"))
        .map(|(key, value)| (key.clone(), value.clone()))
        .collect();
    if parameter.get("type").and_then(Value::as_str) == Some("array") {
        let multi = parameter.get("collectionFormat").and_then(Value::as_str) == Some("multi");
        upgraded.insert("explode".to_owned(), Value::Bool(multi));
    }
    upgraded.insert("schema".to_owned(), Value::Object(schema));
    Value::Object(upgraded)
}
