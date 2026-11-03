use serde_json::{Map, Value};

/// A copy of the value when it is an object, like `isJsonObject(value) ? value : {}`.
pub fn object_or_empty(value: Option<&Value>) -> Map<String, Value> {
    value.and_then(Value::as_object).cloned().unwrap_or_default()
}
