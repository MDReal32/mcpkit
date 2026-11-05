use crate::auth::read_auth_type::read_auth_type;
use crate::guards::is_interactive_auth_type;
use serde_json::Value;

/// OAuth2 entries come first, fallbacks after them. `none` always succeeds, so anything after it would never be tried.
pub fn validate_auth_order(entries: &[Value]) -> Vec<String> {
    let types: Vec<Option<&Value>> = entries.iter().map(read_auth_type).collect();
    let mut errors = Vec::new();
    let first_fallback = types.iter().position(|auth_type| !is_interactive_auth_type(*auth_type));
    if first_fallback.is_some_and(|first| {
        types[first..]
            .iter()
            .any(|auth_type| is_interactive_auth_type(*auth_type))
    }) {
        errors.push("auth: fallback entries must come after every oauth entry".to_owned());
    }
    let all_but_last = &types[..types.len().saturating_sub(1)];
    if all_but_last
        .iter()
        .any(|auth_type| auth_type.and_then(Value::as_str) == Some("none"))
    {
        errors.push("auth: \"none\" can only be the last entry".to_owned());
    }
    errors
}
