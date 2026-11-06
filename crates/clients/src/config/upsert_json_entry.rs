use crate::client_error::ClientError;
use crate::config::set_json_value::set_json_value;
use serde_json::Value;

/// Sets `servers_path.name` to `entry`, keeping comments and the rest of the file as they are.
pub fn upsert_json_entry(text: &str, servers_path: &[&str], name: &str, entry: &Value) -> Result<String, ClientError> {
    let path: Vec<&str> = servers_path.iter().copied().chain([name]).collect();
    set_json_value(text, &path, entry)
}
