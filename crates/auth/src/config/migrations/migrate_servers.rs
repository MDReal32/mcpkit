use serde_json::{Map, Value};

/// Applies `migrate_server` to each server entry that is an object.
pub fn migrate_servers(
    mut data: Map<String, Value>,
    migrate_server: fn(Map<String, Value>) -> Map<String, Value>,
) -> Map<String, Value> {
    let Some(Value::Object(servers)) = data.get_mut("servers") else {
        return data;
    };
    for server in servers.values_mut() {
        if let Value::Object(entry) = server {
            *entry = migrate_server(std::mem::take(entry));
        }
    }
    data
}
