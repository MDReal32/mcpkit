use crate::guards::is_name_template;
use crate::server::consts::MAX_MATCH_LENGTH;
use regex::Regex;
use serde_json::Value;

/// `match` is checked with the `regex` crate, the engine the server names upstream tools with, so its error text is
/// that crate's rather than JavaScript's.
pub fn validate_naming_rule(rule: &Value, position: usize) -> Vec<String> {
    let label = format!("upstream.naming[{position}]");
    let Some(rule) = rule.as_object() else {
        return vec![format!("{label} must be an object")];
    };
    let mut errors = Vec::new();
    match rule.get("match").and_then(Value::as_str) {
        Some(pattern) if !pattern.is_empty() && pattern.encode_utf16().count() <= MAX_MATCH_LENGTH => {
            if let Err(error) = Regex::new(pattern) {
                errors.push(format!("{label}.match is not a valid regular expression: {error}"));
            }
        }
        _ => errors.push(format!(
            "{label}.match must be a regular expression of at most {MAX_MATCH_LENGTH} characters"
        )),
    }
    if !rule.get("name").and_then(Value::as_str).is_some_and(is_name_template) {
        errors.push(format!(
            "{label}.name must be <group>:<resource>:<action> with $1… or $& for the upstream name"
        ));
    }
    errors
}
