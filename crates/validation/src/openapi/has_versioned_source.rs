use serde_json::{Map, Value};

/// Whether one of the manifest's OpenAPI sources can ask the server its version.
pub fn has_versioned_source(manifest: &Map<String, Value>) -> bool {
    manifest
        .get("openapi")
        .and_then(|openapi| openapi.get("sources"))
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .any(|source| source.get("version").is_some())
}
