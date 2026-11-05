use crate::guards::is_cli_command;
use crate::ui::consts::UI_ACTION_TYPES;
use crate::ui::validate_cli_args::validate_cli_args;
use crate::ui::validate_link_url::validate_link_url;
use serde_json::Value;
use usemcpkit_core::js::js_trim;

pub fn validate_ui_action(action: &Value, location: &str, has_domain: bool, allows_cli: bool) -> Vec<String> {
    let action_type = action.get("type").and_then(Value::as_str);
    let Some(action_type) = action_type.filter(|action_type| UI_ACTION_TYPES.contains(action_type)) else {
        return vec![format!(
            "{location}.type must be one of: {}",
            UI_ACTION_TYPES.join(", ")
        )];
    };
    let mut errors = Vec::new();
    if action
        .get("label")
        .and_then(Value::as_str)
        .is_none_or(|label| js_trim(label).is_empty())
    {
        errors.push(format!("{location}.label must be a non-empty string"));
    }
    if action_type == "link" {
        errors.extend(validate_link_url(action.get("url"), location, has_domain));
        return errors;
    }
    if !action
        .get("command")
        .and_then(Value::as_str)
        .is_some_and(is_cli_command)
    {
        errors.push(format!(
            "{location}.command must be a program name found on PATH, without a path or arguments"
        ));
    }
    errors.extend(validate_cli_args(action.get("args"), location, has_domain));
    if !allows_cli {
        errors.push(format!(
            "{location}: a CLI prints one token, so it needs an auth entry with a single credential"
        ));
    }
    errors
}
