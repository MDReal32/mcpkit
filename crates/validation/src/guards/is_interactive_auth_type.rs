use crate::guards::consts::INTERACTIVE_AUTH_TYPES;
use serde_json::Value;

pub fn is_interactive_auth_type(value: Option<&Value>) -> bool {
    value
        .and_then(Value::as_str)
        .is_some_and(|text| INTERACTIVE_AUTH_TYPES.contains(&text))
}
