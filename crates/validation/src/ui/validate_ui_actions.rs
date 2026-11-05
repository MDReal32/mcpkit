use crate::ui::validate_ui_action::validate_ui_action;
use serde_json::Value;

pub fn validate_ui_actions(actions: Option<&Value>, location: &str, has_domain: bool, allows_cli: bool) -> Vec<String> {
    let Some(actions) = actions else {
        return Vec::new();
    };
    let Some(actions) = actions.as_array() else {
        return vec![format!("{location} must be an array")];
    };
    actions
        .iter()
        .enumerate()
        .flat_map(|(index, action)| validate_ui_action(action, &format!("{location}[{index}]"), has_domain, allows_cli))
        .collect()
}
