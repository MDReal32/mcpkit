use crate::client_error::ClientError;
use crate::config::jsonc::set_property;
use crate::consts::JSON_INDENT_SIZE;
use mcpkit_core::js::js_trim;
use serde_json::Value;

/// Sets `servers_path.name` to `entry`, keeping comments and the rest of the file as they are.
pub fn upsert_json_entry(text: &str, servers_path: &[&str], name: &str, entry: &Value) -> Result<String, ClientError> {
    let source = if js_trim(text).is_empty() { "{}" } else { text };
    let path: Vec<&str> = servers_path.iter().copied().chain([name]).collect();
    set_property(source, &path, Some(entry.clone()), JSON_INDENT_SIZE).map_err(ClientError)
}
