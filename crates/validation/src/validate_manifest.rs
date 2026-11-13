use crate::auth::validate_auth;
use crate::openapi::validate_auth_applies;
use crate::server::{validate_domain_spec, validate_editions, validate_server_fields, validate_upstream};
use crate::tool::validate_tools;
use crate::ui::validate_server_ui;
use serde_json::Value;
use std::collections::HashSet;

/// Every error of the manifest, empty when it is valid. Manifests can be downloaded at runtime, so they are treated as
/// untrusted input.
pub fn validate_manifest(manifest: &Value) -> Vec<String> {
    let Some(manifest) = manifest.as_object() else {
        return vec!["manifest must be a JSON object".to_owned()];
    };
    let edition_names: HashSet<&str> = manifest
        .get("editions")
        .and_then(Value::as_object)
        .into_iter()
        .flat_map(|editions| editions.keys().map(String::as_str))
        .collect();
    let has_domain = manifest.contains_key("domain");
    let tool_errors = match manifest.get("upstream") {
        None => validate_tools(manifest.get("tools"), &edition_names),
        Some(upstream) => {
            let mut errors = validate_upstream(upstream, has_domain);
            if manifest
                .get("tools")
                .is_some_and(|tools| tools.as_array().is_none_or(|list| !list.is_empty()))
            {
                errors.extend(validate_tools(manifest.get("tools"), &edition_names));
            }
            errors
        }
    };
    let mut errors = validate_server_fields(manifest);
    errors.extend(validate_domain_spec(manifest));
    errors.extend(validate_editions(manifest.get("editions")));
    errors.extend(validate_auth(manifest.get("auth"), "auth", has_domain));
    errors.extend(validate_auth_applies(manifest));
    errors.extend(validate_server_ui(manifest));
    errors.extend(tool_errors);
    errors
}
