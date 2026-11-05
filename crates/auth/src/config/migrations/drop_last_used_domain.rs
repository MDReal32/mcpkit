use crate::json::object_or_empty;
use serde_json::{Map, Value};

/// 2 → 3: the last used `domain` is dropped, the hosts it was kept in already list it.
pub fn drop_last_used_domain(mut server: Map<String, Value>) -> Map<String, Value> {
    let Some(Value::String(domain)) = server.shift_remove("domain") else {
        return server;
    };
    let mut hosts = Map::new();
    hosts.insert(domain, Value::Object(Map::new()));
    hosts.extend(object_or_empty(server.get("hosts")));
    server.insert("hosts".to_owned(), Value::Object(hosts));
    server
}
