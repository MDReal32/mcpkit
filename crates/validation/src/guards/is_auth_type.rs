use crate::guards::consts::AUTH_TYPES;
use serde_json::Value;

pub fn is_auth_type(value: Option<&Value>) -> bool {
    value
        .and_then(Value::as_str)
        .is_some_and(|text| AUTH_TYPES.contains(&text))
}
