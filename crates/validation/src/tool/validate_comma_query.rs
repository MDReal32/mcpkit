use crate::guards::is_string_list;
use serde_json::Value;

pub fn validate_comma_query(keys: Option<&Value>, location: &str) -> Vec<String> {
    match keys {
        Some(keys) if !is_string_list(Some(keys)) => vec![format!("{location} must be an array of strings")],
        _ => Vec::new(),
    }
}
