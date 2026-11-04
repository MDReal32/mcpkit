use crate::ui::consts::UI_INPUT_KEYS;
use serde_json::Value;

pub fn validate_ui_inputs(inputs: Option<&Value>, location: &str, env_names: &[String]) -> Vec<String> {
    let Some(inputs) = inputs else {
        return Vec::new();
    };
    let Some(inputs) = inputs.as_object() else {
        return vec![format!("{location} must map env var names to objects")];
    };
    inputs
        .iter()
        .flat_map(|(name, input)| {
            let input_location = format!("{location}.{name}");
            if !env_names.contains(name) {
                return vec![format!(
                    "{input_location}: \"{name}\" is not a credential of this auth entry ({})",
                    env_names.join(", ")
                )];
            }
            let Some(input) = input.as_object() else {
                return vec![format!("{input_location} must be an object")];
            };
            let mut errors: Vec<String> = UI_INPUT_KEYS
                .iter()
                .filter(|key| input.get(**key).is_some_and(|value| !value.is_string()))
                .map(|key| format!("{input_location}.{key} must be a string"))
                .collect();
            if input.get("secret").is_some_and(|secret| !secret.is_boolean()) {
                errors.push(format!("{input_location}.secret must be a boolean"));
            }
            errors
        })
        .collect()
}
