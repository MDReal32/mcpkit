use serde_json::Value;
use std::collections::HashSet;
use usemcpkit_core::js::to_js_string;

pub fn validate_file_args(file_args: Option<&Value>, declared_args: &HashSet<&str>, location: &str) -> Vec<String> {
    let Some(file_args) = file_args else {
        return Vec::new();
    };
    let Some(names) = file_args.as_array() else {
        return vec![format!("{location} must be an array of argument names")];
    };
    names
        .iter()
        .filter(|name| !name.as_str().is_some_and(|name| declared_args.contains(name)))
        .map(|name| format!("{location} names an undeclared arg: {}", to_js_string(Some(name))))
        .collect()
}
