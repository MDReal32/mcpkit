use crate::guards::{is_endpoint_tool_name, is_tool_name, read_js_text};
use crate::tool::consts::{ENDPOINT_TOOL_NAME, TOOL_NAME_PATTERN};
use serde_json::{Map, Value};

/// `endpoint_names`: the manifest builds tools from OpenAPI documents, so a hand-written one may take an endpoint's name.
pub fn validate_tool_fields(tool: &Map<String, Value>, location: &str, endpoint_names: bool) -> Vec<String> {
    let mut errors = Vec::new();
    let name = read_js_text(tool.get("name"));
    if endpoint_names {
        if !is_tool_name(&name) && !is_endpoint_tool_name(&name) {
            errors.push(format!(
                "{location}.name must match {TOOL_NAME_PATTERN} or name {ENDPOINT_TOOL_NAME}"
            ));
        }
    } else if !is_tool_name(&name) {
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
