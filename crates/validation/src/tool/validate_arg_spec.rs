use crate::tool::read_arg_names::read_arg_names;
use serde_json::Value;
use std::collections::HashSet;

pub fn validate_arg_spec(spec: Option<&Value>, declared_args: &HashSet<&str>, location: &str) -> Vec<String> {
    let Some(spec) = spec else {
        return Vec::new();
    };
    let Some(names) = read_arg_names(spec) else {
        return vec![format!(
            "{location} must be an array of arg names or an object of strings"
        )];
    };
    names
        .into_iter()
        .filter(|name| !declared_args.contains(name))
        .map(|name| format!("{location} uses undeclared arg \"{name}\""))
        .collect()
}
