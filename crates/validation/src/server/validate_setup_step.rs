use crate::guards::{is_program_name, is_string_list};
use serde_json::Value;

pub fn validate_setup_step(step: &Value, position: usize) -> Vec<String> {
    let label = format!("upstream.repo.setup[{position}]");
    let Some(step) = step.as_object() else {
        return vec![format!("{label} must be an object")];
    };
    let mut errors = Vec::new();
    if !step.get("command").and_then(Value::as_str).is_some_and(is_program_name) {
        errors.push(format!("{label}.command must be a program name on PATH, not a path"));
    }
    if step.get("args").is_some_and(|args| !is_string_list(Some(args))) {
        errors.push(format!("{label}.args must be a list of strings"));
    }
    errors
}
