use crate::tool::describe_tool_location::describe_tool_location;
use crate::tool::validate_request::validate_request;
use crate::tool::validate_tool_editions::validate_tool_editions;
use crate::tool::validate_tool_fields::validate_tool_fields;
use serde_json::Value;
use std::collections::HashSet;

pub fn validate_tool(tool: &Value, index: usize, edition_names: &HashSet<&str>, endpoint_names: bool) -> Vec<String> {
    let location = describe_tool_location(tool, index);
    let Some(tool) = tool.as_object() else {
        return vec![format!("{location} must be an object")];
    };
    let mut errors = validate_tool_fields(tool, &location, endpoint_names);
    let Some(input) = tool
        .get("input")
        .and_then(Value::as_object)
        .filter(|input| input.get("type").and_then(Value::as_str) == Some("object"))
    else {
        errors.push(format!("{location}.input must be a JSON Schema with type \"object\""));
        return errors;
    };
    let declared_args: HashSet<&str> = input
        .get("properties")
        .and_then(Value::as_object)
        .into_iter()
        .flat_map(|properties| properties.keys().map(String::as_str))
        .collect();
    errors.extend(validate_request(tool.get("request"), &declared_args, &location));
    errors.extend(validate_tool_editions(tool, &declared_args, edition_names, &location));
    errors
}
