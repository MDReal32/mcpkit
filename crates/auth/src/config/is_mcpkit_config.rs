use crate::config::config_migrations::CONFIG_VERSION;
use crate::json::is_string_record;
use serde_json::{Map, Value};

/// The current version with `servers.<category>.<name>` objects whose `hosts.<host>.secrets` and `projects` hold
/// strings; any other key is kept as it is.
pub fn is_mcpkit_config(config: &Map<String, Value>) -> bool {
    let is_host = |host: &Value| {
        host.as_object()
            .is_some_and(|host| host.get("secrets").is_none_or(is_string_record))
    };
    let is_server = |server: &Value| {
        server.as_object().is_some_and(|server| {
            server
                .get("hosts")
                .is_none_or(|hosts| hosts.as_object().is_some_and(|hosts| hosts.values().all(is_host)))
                && server.get("projects").is_none_or(is_string_record)
        })
    };
    let is_group = |group: &Value| group.as_object().is_some_and(|group| group.values().all(is_server));
    config.get("version").and_then(Value::as_f64) == Some(CONFIG_VERSION as f64)
        && config.get("servers").is_none_or(|servers| {
            servers
                .as_object()
                .is_some_and(|servers| servers.values().all(is_group))
        })
}
