use crate::ui::consts::UI_AUTH_KEYS;
use crate::ui::validate_ui_actions::validate_ui_actions;
use crate::ui::validate_ui_inputs::validate_ui_inputs;
use serde_json::{Map, Value};
use usemcpkit_core::js::to_js_string;

/// A stdio upstream's form asks for its `forwardEnv` credentials; it has no domain and no CLI to take a token from.
pub fn validate_stdio_ui(upstream: &Map<String, Value>) -> Vec<String> {
    let Some(ui) = upstream.get("ui") else {
        return Vec::new();
    };
    let Some(ui) = ui.as_object() else {
        return vec!["upstream.ui must be an object".to_owned()];
    };
    let forward_env: Vec<String> = upstream
        .get("forwardEnv")
        .and_then(Value::as_array)
        .into_iter()
        .flatten()
        .map(|name| to_js_string(Some(name)))
        .collect();
    let mut errors: Vec<String> = ui
        .keys()
        .filter(|key| !UI_AUTH_KEYS.contains(&key.as_str()))
        .map(|key| format!("upstream.ui.{key} is not allowed here"))
        .collect();
    errors.extend(validate_ui_inputs(ui.get("inputs"), "upstream.ui.inputs", &forward_env));
    errors.extend(validate_ui_actions(
        ui.get("actions"),
        "upstream.ui.actions",
        false,
        false,
    ));
    errors
}
