use crate::auth::consts::AUTH_REQUIRED_KEYS;
use crate::auth::validate_oauth_fields::validate_oauth_fields;
use crate::guards::{AUTH_TYPES, is_auth_type, is_js_string};
use crate::ui::validate_auth_ui;
use serde_json::Value;

pub fn validate_auth_spec(auth: &Value, location: &str, has_domain: bool) -> Vec<String> {
    let Some(object) = auth.as_object().filter(|object| is_auth_type(object.get("type"))) else {
        return vec![format!("{location}.type must be one of: {}", AUTH_TYPES.join(", "))];
    };
    let auth_type = object.get("type").and_then(Value::as_str).unwrap_or_default();
    let discovers = auth_type == "oauth" && object.contains_key("discovery");
    let required = AUTH_REQUIRED_KEYS
        .iter()
        .filter(|_| !discovers)
        .find(|(name, _)| *name == auth_type)
        .map_or(&[][..], |(_, keys)| keys);
    let missing: Vec<String> = required
        .iter()
        .filter(|key| !is_js_string(object.get(**key)))
        .map(|key| format!("{location}.{key} is required for auth type \"{auth_type}\""))
        .collect();
    if !missing.is_empty() {
        return missing;
    }
    let mut ui_errors = Vec::new();
    if object.get("label").is_some_and(|label| !label.is_string()) {
        ui_errors.push(format!("{location}.label must be a string"));
    }
    ui_errors.extend(validate_auth_ui(object, location, has_domain));
    if auth_type != "oauth" {
        return ui_errors;
    }
    let mut errors = validate_oauth_fields(object, location);
    errors.extend(ui_errors);
    errors
}
