use serde_json::Value;
use std::collections::HashSet;
use usemcpkit_manifest::ui::read_placeholders;

pub fn validate_request_path(path: Option<&Value>, declared_args: &HashSet<&str>, location: &str) -> Vec<String> {
    let Some(path) = path.and_then(Value::as_str).filter(|path| path.starts_with('/')) else {
        return vec![format!("{location}.request.path must start with \"/\"")];
    };
    read_placeholders(path)
        .into_iter()
        .filter(|name| !declared_args.contains(name))
        .map(|name| format!("{location}.request.path uses undeclared arg \"{name}\""))
        .collect()
}
