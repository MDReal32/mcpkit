use serde_json::{Map, Value};

/// The names of the manifest's OpenAPI sources, in order.
pub fn read_source_names(manifest: &Map<String, Value>) -> Vec<&str> {
    manifest
        .get("openapi")
        .and_then(|openapi| openapi.get("sources"))
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .filter_map(|source| source.get("name").and_then(Value::as_str))
        .collect()
}
