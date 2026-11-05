use crate::migrations::consts::FIRST_VERSION;
use serde_json::Value;

/// Data without a `version` is the first version.
pub fn read_version(data: &Value) -> Value {
    match data.as_object().and_then(|object| object.get("version")) {
        Some(version) => version.clone(),
        None => Value::from(FIRST_VERSION),
    }
}
