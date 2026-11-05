use crate::guards::{is_base_url, is_category_name, is_server_name, is_string_record, read_js_text};
use crate::server::consts::{SERVER_CATEGORY_PATTERN, SERVER_NAME_PATTERN};
use serde_json::{Map, Value};

pub fn validate_server_fields(manifest: &Map<String, Value>) -> Vec<String> {
    let mut errors = Vec::new();
    if !is_server_name(&read_js_text(manifest.get("name"))) {
        errors.push(format!("name must match {SERVER_NAME_PATTERN}"));
    }
    if !is_category_name(&read_js_text(manifest.get("category"))) {
        errors.push(format!("category must match {SERVER_CATEGORY_PATTERN}"));
    }
    if !manifest.get("version").is_some_and(Value::is_string) {
        errors.push("version is required".to_owned());
    }
    if !is_base_url(manifest.get("baseUrl")) {
        errors.push("baseUrl must be an https:// URL".to_owned());
    }
    if manifest
        .get("headers")
        .is_some_and(|headers| !is_string_record(Some(headers)))
    {
        errors.push("headers must be an object of strings".to_owned());
    }
    errors
}
