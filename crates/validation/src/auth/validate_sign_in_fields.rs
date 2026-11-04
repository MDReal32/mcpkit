use crate::guards::{is_port, is_string_list};
use serde_json::{Map, Value};

/// Fields shared by every interactive auth type.
pub fn validate_sign_in_fields(auth: &Map<String, Value>, location: &str) -> Vec<String> {
    let mut errors = Vec::new();
    if auth.get("scopes").is_some_and(|scopes| !is_string_list(Some(scopes))) {
        errors.push(format!("{location}.scopes must be an array of strings"));
    }
    if auth.get("redirectPort").is_some_and(|port| !is_port(Some(port))) {
        errors.push(format!(
            "{location}.redirectPort must be an integer between 0 and 65535"
        ));
    }
    errors
}
