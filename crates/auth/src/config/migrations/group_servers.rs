use crate::json::object_entry;
use serde_json::{Map, Value};

/// `servers.<name>` becomes `servers.<group>.<name>`.
pub fn group_servers(mut data: Map<String, Value>, to_group: fn(&str) -> &str) -> Map<String, Value> {
    let Some(Value::Object(servers)) = data.get_mut("servers") else {
        return data;
    };
    let mut grouped = Map::new();
    for (name, server) in std::mem::take(servers) {
        object_entry(&mut grouped, to_group(&name)).insert(name, server);
    }
    *servers = grouped;
    data
}
