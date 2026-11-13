use crate::guards::is_string_list;
use serde_json::Value;
use usemcpkit_manifest::condition::parse_version_condition;

/// An `applies` object: `sources` naming OpenAPI sources of the manifest, `if` a condition on the version.
pub fn validate_applies(applies: &Value, location: &str, source_names: &[&str]) -> Vec<String> {
    let Some(applies) = applies.as_object() else {
        return vec![format!("{location} must be an object")];
    };
    if source_names.is_empty() {
        return vec![format!("{location} needs OpenAPI sources in the manifest")];
    }
    let mut errors = Vec::new();
    match applies.get("sources") {
        None => {}
        Some(sources) if is_string_list(Some(sources)) => {
            for name in sources.as_array().into_iter().flatten().filter_map(Value::as_str) {
                if !source_names.contains(&name) {
                    errors.push(format!(
                        "{location}.sources names \"{name}\", which is not an OpenAPI source"
                    ));
                }
            }
        }
        Some(_) => errors.push(format!("{location}.sources must be a list of strings")),
    }
    match applies.get("if") {
        None => {}
        Some(Value::String(condition)) => {
            if let Err(error) = parse_version_condition(condition) {
                errors.push(format!("{location}.if is not a version condition: {error}"));
            }
        }
        Some(_) => errors.push(format!("{location}.if must be a string")),
    }
    for key in applies.keys().filter(|key| !["sources", "if"].contains(&key.as_str())) {
        errors.push(format!("{location}.{key} is not allowed; use sources and if"));
    }
    errors
}
