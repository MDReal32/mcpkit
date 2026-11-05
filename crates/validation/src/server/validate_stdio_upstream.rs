use crate::guards::{is_program_name, is_string_list};
use crate::server::consts::STDIO_LIST_KEYS;
use crate::server::validate_upstream_repo::validate_upstream_repo;
use crate::ui::validate_stdio_ui;
use serde_json::{Map, Value};

pub fn validate_stdio_upstream(upstream: &Map<String, Value>) -> Vec<String> {
    let mut errors = Vec::new();
    if !upstream
        .get("command")
        .and_then(Value::as_str)
        .is_some_and(is_program_name)
    {
        errors.push("upstream.command must be a program name on PATH, not a path".to_owned());
    }
    for key in STDIO_LIST_KEYS {
        if upstream.get(*key).is_some_and(|list| !is_string_list(Some(list))) {
            errors.push(format!("upstream.{key} must be a list of strings"));
        }
    }
    if let Some(repo) = upstream.get("repo") {
        errors.extend(validate_upstream_repo(repo));
    }
    errors.extend(validate_stdio_ui(upstream));
    errors
}
