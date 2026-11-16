use crate::openapi::read_source_names::read_source_names;
use crate::openapi::validate_applies::validate_applies;
use serde_json::{Map, Value};

/// The `applies` of the manifest's hand-written tools.
pub fn validate_tool_applies(manifest: &Map<String, Value>) -> Vec<String> {
    let source_names = read_source_names(manifest);
    manifest
        .get("tools")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .enumerate()
        .filter_map(|(index, tool)| Some((index, tool.get("applies")?)))
        .flat_map(|(index, applies)| validate_applies(applies, &format!("tools[{index}].applies"), &source_names))
        .collect()
}
