use crate::consts::DEFAULT_HOST_KEY;
use crate::json::object_or_empty;
use serde_json::{Map, Value};

/// 1 → 2: a server's `secrets` move under the host of its domain, and the domain itself becomes a known host.
pub fn move_secrets_under_host(mut server: Map<String, Value>) -> Map<String, Value> {
    let secrets = server.shift_remove("secrets");
    let domain = server.get("domain").and_then(Value::as_str).map(str::to_owned);
    let mut hosts = Map::new();
    if let Some(domain) = &domain {
        hosts.insert(domain.clone(), Value::Object(Map::new()));
    }
    hosts.extend(object_or_empty(server.get("hosts")));
    let host = domain.unwrap_or_else(|| DEFAULT_HOST_KEY.to_owned());
    if let Some(Value::Object(mut merged)) = secrets {
        let mut current = object_or_empty(hosts.get(&host));
        merged.extend(object_or_empty(current.get("secrets")));
        current.insert("secrets".to_owned(), Value::Object(merged));
        hosts.insert(host, Value::Object(current));
    }
    if !hosts.is_empty() {
        server.insert("hosts".to_owned(), Value::Object(hosts));
    }
    server
}

#[cfg(test)]
mod tests {
    use super::move_secrets_under_host;
    use serde_json::{Value, json};

    fn migrate(server: Value) -> Value {
        Value::Object(move_secrets_under_host(server.as_object().unwrap().clone()))
    }

    #[test]
    fn moves_secrets_under_the_domain_host_keeping_saved_ones() {
        assert_eq!(
            migrate(json!({
                "domain": "h",
                "secrets": { "A": "old", "B": "b" },
                "hosts": { "h": { "secrets": { "A": "new" } } },
            })),
            json!({ "domain": "h", "hosts": { "h": { "secrets": { "A": "new", "B": "b" } } } })
        );
        assert_eq!(
            migrate(json!({ "secrets": { "A": "a" } })),
            json!({ "hosts": { "default": { "secrets": { "A": "a" } } } })
        );
        assert_eq!(migrate(json!({ "other": 1 })), json!({ "other": 1 }));
    }
}
