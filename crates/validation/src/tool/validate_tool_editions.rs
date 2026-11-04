use crate::tool::validate_request::validate_request;
use serde_json::{Map, Value};
use std::collections::HashSet;

pub fn validate_tool_editions(
    tool: &Map<String, Value>,
    declared_args: &HashSet<&str>,
    edition_names: &HashSet<&str>,
    location: &str,
) -> Vec<String> {
    let Some(editions) = tool.get("editions") else {
        return Vec::new();
    };
    let Some(editions) = editions.as_object() else {
        return vec![format!("{location}.editions must be an object")];
    };
    editions
        .iter()
        .flat_map(|(name, edition)| {
            let edition_location = format!("{location}.editions.{name}");
            if !edition_names.contains(name.as_str()) {
                return vec![format!(
                    "{edition_location}: \"{name}\" is not in the manifest's editions"
                )];
            }
            let Some(edition) = edition.as_object() else {
                return vec![format!("{edition_location} must be an object")];
            };
            let mut errors = validate_request(edition.get("request"), declared_args, &edition_location);
            if edition.get("response").is_some_and(|response| !response.is_object()) {
                errors.push(format!("{edition_location}.response must be an object"));
            }
            errors
        })
        .collect()
}
