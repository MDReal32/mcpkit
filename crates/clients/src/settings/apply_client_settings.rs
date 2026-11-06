use crate::client_context::ClientContext;
use crate::client_definition::ClientDefinition;
use crate::client_error::ClientError;
use crate::config::{has_json_bool, parse_json_config, read_config_text, set_json_value, write_config_text};
use serde_json::Value;

/// Sets each of the client's own settings usemcpkit needs, keeping comments and every other key; a file that already
/// has the value is not rewritten.
pub fn apply_client_settings(definition: &ClientDefinition, context: &ClientContext) -> Result<(), ClientError> {
    for setting in definition.settings {
        let path = (setting.file)(context);
        let text = read_config_text(&path)?;
        let tree = parse_json_config(&text, &path)?;
        if has_json_bool(&tree, &text, setting.key, setting.value) {
            continue;
        }
        let updated = set_json_value(&text, setting.key, &Value::Bool(setting.value))?;
        write_config_text(&path, &updated)?;
    }
    Ok(())
}
