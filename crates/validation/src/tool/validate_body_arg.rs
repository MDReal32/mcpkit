use serde_json::{Map, Value};
use std::collections::HashSet;

pub fn validate_body_arg(request: &Map<String, Value>, declared_args: &HashSet<&str>, location: &str) -> Vec<String> {
    let Some(body_arg) = request.get("bodyArg") else {
        return Vec::new();
    };
    if !body_arg.as_str().is_some_and(|name| declared_args.contains(name)) {
        return vec![format!("{location}.request.bodyArg must name a declared arg")];
    }
    if request.contains_key("body") || request.contains_key("fixedBody") {
        return vec![format!(
            "{location}.request.bodyArg cannot be combined with body or fixedBody"
        )];
    }
    Vec::new()
}
