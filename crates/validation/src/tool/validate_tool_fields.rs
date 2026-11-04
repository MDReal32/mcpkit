use crate::guards::{is_tool_name, read_js_text};
use crate::tool::consts::TOOL_NAME_PATTERN;
use serde_json::{Map, Value};

pub fn validate_tool_fields(tool: &Map<String, Value>, location: &str) -> Vec<String> {
    let mut errors = Vec::new();
    if !is_tool_name(&read_js_text(tool.get("name"))) {
        errors.push(format!("{location}.name must match {TOOL_NAME_PATTERN}"));
    }
    if !tool.get("description").is_some_and(Value::is_string) {
        errors.push(format!("{location}.description is required"));
    }
    if tool.get("response").is_some_and(|response| !response.is_object()) {
        errors.push(format!("{location}.response must be an object"));
    }
    errors
}
