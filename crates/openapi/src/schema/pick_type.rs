use crate::consts::JSON_TYPES;
use serde_json::{Map, Value};

/// The first JSON type of a schema's `type` (a string or a list, where `null` is skipped).
pub fn pick_type(schema: &Map<String, Value>) -> Option<&str> {
    match schema.get("type") {
        Some(Value::String(name)) => Some(name.as_str()).filter(|name| JSON_TYPES.contains(name)),
        Some(Value::Array(names)) => names
            .iter()
            .filter_map(Value::as_str)
            .find(|name| JSON_TYPES.contains(name)),
        _ => None,
    }
}
