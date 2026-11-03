use crate::ids::{is_part_name, is_sha256};
use mcpkit_manifest::registry::ManifestPart;

const PART_NAME_PATTERN: &str = "/^[a-z][a-z0-9_]*$/";

pub fn check_manifest_parts(parts: &[ManifestPart]) -> Result<(), String> {
    if parts.is_empty() {
        return Err("\"parts\" must be a non-empty array".into());
    }
    for (position, part) in parts.iter().enumerate() {
        if !is_part_name(&part.name) {
            return Err(format!("parts[{position}].name must match {PART_NAME_PATTERN}"));
        }
        if !is_sha256(&part.sha256) {
            return Err(format!("parts[{position}].sha256 must be a hex SHA-256"));
        }
    }
    Ok(())
}
