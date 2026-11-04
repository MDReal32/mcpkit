use crate::validate_manifest::validate_manifest;
use serde_json::Value;

pub fn is_valid_manifest(manifest: &Value) -> bool {
    validate_manifest(manifest).is_empty()
}
