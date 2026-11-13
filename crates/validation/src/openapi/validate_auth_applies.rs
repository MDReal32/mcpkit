use crate::openapi::read_source_names::read_source_names;
use crate::openapi::validate_applies::validate_applies;
use serde_json::{Map, Value};

/// The `applies` of the manifest's auth entries.
pub fn validate_auth_applies(manifest: &Map<String, Value>) -> Vec<String> {
    let source_names = read_source_names(manifest);
    manifest
        .get("auth")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .enumerate()
        .filter_map(|(index, auth)| Some((index, auth.get("applies")?)))
        .flat_map(|(index, applies)| validate_applies(applies, &format!("auth[{index}].applies"), &source_names))
        .collect()
}
