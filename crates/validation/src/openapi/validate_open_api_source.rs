use crate::guards::{is_category_name, is_string_list};
use crate::openapi::consts::{SOURCE_NAME_PATTERN, VERSION_PLACEHOLDER};
use crate::openapi::validate_conversion_options::validate_conversion_options;
use crate::openapi::validate_spec_versioning::validate_spec_versioning;
use serde_json::Value;

pub fn validate_open_api_source(source: &Value, location: &str) -> Vec<String> {
    let Some(source) = source.as_object() else {
        return vec![format!("{location} must be an object")];
    };
    let mut errors = Vec::new();
    if !source.get("name").and_then(Value::as_str).is_some_and(is_category_name) {
        errors.push(format!("{location}.name must match {SOURCE_NAME_PATTERN}"));
    }
    if source.get("label").is_some_and(|label| !label.is_string()) {
        errors.push(format!("{location}.label must be a string"));
    }
    let hosts = source.get("hosts");
    if hosts.is_some_and(|hosts| !is_string_list(Some(hosts)) || hosts.as_array().is_some_and(Vec::is_empty)) {
        errors.push(format!("{location}.hosts must be a non-empty array of host suffixes"));
    }
    let url = source.get("url").and_then(Value::as_str).unwrap_or_default();
    if url.is_empty() {
        errors.push(format!("{location}.url must be a URL or a path in the registry"));
    }
    let versioned = source.get("version").is_some();
    if url.contains(VERSION_PLACEHOLDER) && !versioned {
        errors.push(format!(
            "{location}.url uses {VERSION_PLACEHOLDER}, which needs a version"
        ));
    }
    if versioned && !url.contains(VERSION_PLACEHOLDER) {
        errors.push(format!(
            "{location}.url must use {VERSION_PLACEHOLDER} for a versioned source"
        ));
    }
    match source.get("sha256") {
        None => {}
        Some(Value::String(sha256))
            if sha256.len() == 64 && sha256.chars().all(|character| character.is_ascii_hexdigit()) =>
        {
            if versioned {
                errors.push(format!("{location}.sha256 cannot pin a versioned source"));
            }
        }
        Some(_) => errors.push(format!("{location}.sha256 must be a hex SHA-256")),
    }
    if let Some(version) = source.get("version") {
        errors.extend(validate_spec_versioning(version, &format!("{location}.version")));
    }
    if source.get("basePath").is_some_and(|path| {
        !path
            .as_str()
            .is_some_and(|path| path.is_empty() || path.starts_with('/'))
    }) {
        errors.push(format!("{location}.basePath must be empty or start with /"));
    }
    if let Some(options) = source.get("options") {
        errors.extend(validate_conversion_options(options, &format!("{location}.options")));
    }
    errors
}
