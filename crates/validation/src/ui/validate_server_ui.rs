use crate::ui::consts::UI_SERVER_KEYS;
use crate::ui::validate_ui_texts::validate_ui_texts;
use serde_json::{Map, Value};

pub fn validate_server_ui(manifest: &Map<String, Value>) -> Vec<String> {
    let Some(ui) = manifest.get("ui") else {
        return Vec::new();
    };
    let Some(ui) = ui.as_object() else {
        return vec!["ui must be an object".to_owned()];
    };
    let mut errors: Vec<String> = ui
        .keys()
        .filter(|key| !UI_SERVER_KEYS.contains(&key.as_str()))
        .map(|key| format!("ui.{key} is not allowed here, use it on an auth entry"))
        .collect();
    errors.extend(validate_ui_texts(ui.get("texts"), "ui.texts"));
    errors
}
