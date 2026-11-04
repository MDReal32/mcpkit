use crate::auth::validate_auth_order::validate_auth_order;
use crate::auth::validate_auth_spec::validate_auth_spec;
use serde_json::Value;

pub fn validate_auth(auth: Option<&Value>, has_domain: bool) -> Vec<String> {
    let Some(auth) = auth else {
        return Vec::new();
    };
    let Some(entries) = auth.as_array().filter(|entries| !entries.is_empty()) else {
        return vec!["auth must be a non-empty array, tried from top to bottom".to_owned()];
    };
    let mut errors: Vec<String> = entries
        .iter()
        .enumerate()
        .flat_map(|(index, entry)| validate_auth_spec(entry, &format!("auth[{index}]"), has_domain))
        .collect();
    errors.extend(validate_auth_order(entries));
    errors
}
