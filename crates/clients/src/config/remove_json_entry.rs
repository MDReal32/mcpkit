use crate::client_error::ClientError;
use crate::config::jsonc::set_property;
use crate::consts::JSON_INDENT_SIZE;

pub fn remove_json_entry(text: &str, servers_path: &[&str], name: &str) -> Result<String, ClientError> {
    let path: Vec<&str> = servers_path.iter().copied().chain([name]).collect();
    set_property(text, &path, None, JSON_INDENT_SIZE).map_err(ClientError)
}
