use crate::ToolError;
use serde_json::{Map, Value};

/// An argument sent as `null` counts as given, like `args[name] === undefined` in the TypeScript executor.
pub fn assert_required_args(input: &Map<String, Value>, args: &Map<String, Value>) -> Result<(), ToolError> {
    let missing: Vec<&str> = input
        .get("required")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .filter_map(Value::as_str)
        .filter(|name| !args.contains_key(*name))
        .collect();
    if missing.is_empty() {
        return Ok(());
    }
    Err(ToolError(format!(
        "missing required argument(s): {}",
        missing.join(", ")
    )))
}
