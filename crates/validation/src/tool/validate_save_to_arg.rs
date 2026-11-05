use serde_json::Value;
use std::collections::HashSet;

pub fn validate_save_to_arg(save_to_arg: Option<&Value>, declared_args: &HashSet<&str>, location: &str) -> Vec<String> {
    match save_to_arg {
        Some(name) if !name.as_str().is_some_and(|name| declared_args.contains(name)) => {
            vec![format!("{location}.request.saveToArg must name a declared arg")]
        }
        _ => Vec::new(),
    }
}
