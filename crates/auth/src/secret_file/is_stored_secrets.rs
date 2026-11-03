use crate::json::is_string_record;
use serde_json::Value;

/// Credentials by server name and then key, all strings.
pub fn is_stored_secrets(value: &Value) -> bool {
    value
        .as_object()
        .is_some_and(|servers| servers.values().all(is_string_record))
}
