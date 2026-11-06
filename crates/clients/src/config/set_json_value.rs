use crate::client_error::ClientError;
use crate::config::jsonc::set_property;
use crate::consts::JSON_INDENT_SIZE;
use serde_json::Value;
use usemcpkit_core::js::js_trim;

/// Sets the property at `path` to `value`, keeping comments and the rest of the file as they are.
pub fn set_json_value(text: &str, path: &[&str], value: &Value) -> Result<String, ClientError> {
    let source = if js_trim(text).is_empty() { "{}" } else { text };
    set_property(source, path, Some(value.clone()), JSON_INDENT_SIZE).map_err(ClientError)
}
