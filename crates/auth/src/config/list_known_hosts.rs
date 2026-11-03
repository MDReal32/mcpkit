use serde_json::{Map, Value};

/// The hosts a server has been used with: those with saved settings.
pub fn list_known_hosts(server: Option<&Map<String, Value>>) -> Vec<String> {
    server
        .and_then(|server| server.get("hosts"))
        .and_then(Value::as_object)
        .map(|hosts| hosts.keys().cloned().collect())
        .unwrap_or_default()
}
