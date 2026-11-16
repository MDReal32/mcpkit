use crate::document::upgrade_swagger2_parameter::upgrade_swagger2_parameter;
use serde_json::{Map, Value, json};

/// The schema of a Swagger 2.0 form field, a `type: file` one being a binary string.
pub fn file_aware_schema(parameter: &Map<String, Value>) -> Value {
    if parameter.get("type").and_then(Value::as_str) == Some("file") {
        return json!({ "type": "string", "format": "binary" });
    }
    upgrade_swagger2_parameter(parameter)
        .get("schema")
        .cloned()
        .unwrap_or_else(|| json!({}))
}
