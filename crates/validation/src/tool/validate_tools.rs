use crate::find_duplicates::find_duplicates;
use crate::tool::validate_tool::validate_tool;
use serde_json::Value;
use std::collections::HashSet;
use usemcpkit_core::js::to_js_string;

/// Duplicate names are listed like JavaScript's `join`, which leaves a missing or `null` name empty.
pub fn validate_tools(tools: Option<&Value>, edition_names: &HashSet<&str>) -> Vec<String> {
    let Some(tools) = tools.and_then(Value::as_array).filter(|tools| !tools.is_empty()) else {
        return vec!["tools must be a non-empty array".to_owned()];
    };
    let mut errors: Vec<String> = tools
        .iter()
        .enumerate()
        .flat_map(|(index, tool)| validate_tool(tool, index, edition_names))
        .collect();
    let names: Vec<Option<&Value>> = tools
        .iter()
        .map(|tool| tool.as_object().and_then(|tool| tool.get("name")))
        .collect();
    let duplicates = find_duplicates(&names);
    if !duplicates.is_empty() {
        let listed: Vec<String> = duplicates
            .into_iter()
            .map(|name| match name {
                None | Some(Value::Null) => String::new(),
                name => to_js_string(name),
            })
            .collect();
        errors.push(format!("duplicate tool names: {}", listed.join(", ")));
    }
    errors
}
