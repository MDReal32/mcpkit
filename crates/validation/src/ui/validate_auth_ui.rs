use crate::ui::consts::{AUTH_ENV_KEYS, UI_AUTH_KEYS, UI_AUTH_TYPES};
use crate::ui::validate_ui_actions::validate_ui_actions;
use crate::ui::validate_ui_inputs::validate_ui_inputs;
use serde_json::{Map, Value};

pub fn validate_auth_ui(auth: &Map<String, Value>, location: &str, has_domain: bool) -> Vec<String> {
    let Some(ui) = auth.get("ui") else {
        return Vec::new();
    };
    let ui_location = format!("{location}.ui");
    let auth_type = auth.get("type").and_then(Value::as_str);
    if !auth_type.is_some_and(|auth_type| UI_AUTH_TYPES.contains(&auth_type)) {
        return vec![format!(
            "{ui_location} is only allowed for auth types: {}",
            UI_AUTH_TYPES.join(", ")
        )];
    }
    let Some(ui) = ui.as_object() else {
        return vec![format!("{ui_location} must be an object")];
    };
    let env_names: Vec<String> = AUTH_ENV_KEYS
        .iter()
        .filter_map(|key| auth.get(*key).and_then(Value::as_str).map(str::to_owned))
        .collect();
    let mut errors: Vec<String> = ui
        .keys()
        .filter(|key| !UI_AUTH_KEYS.contains(&key.as_str()))
        .map(|key| format!("{ui_location}.{key} is not allowed here, use it on the manifest"))
        .collect();
    errors.extend(validate_ui_inputs(
        ui.get("inputs"),
        &format!("{ui_location}.inputs"),
        &env_names,
    ));
    errors.extend(validate_ui_actions(
        ui.get("actions"),
        &format!("{ui_location}.actions"),
        has_domain,
        auth_type != Some("basic"),
    ));
    errors
}
