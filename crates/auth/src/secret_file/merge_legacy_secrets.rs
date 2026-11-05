use crate::config::list_known_hosts;
use crate::config::migrations::to_legacy_category;
use crate::consts::DEFAULT_HOST_KEY;
use crate::json::{object_entry, object_or_empty};
use serde_json::{Map, Value};

/// Adds the credentials of the old secrets file under the host the server uses, its only known host or the default
/// one; a value already in the config wins.
pub fn merge_legacy_secrets(mut config: Map<String, Value>, legacy: &Map<String, Value>) -> Map<String, Value> {
    let servers = object_entry(&mut config, "servers");
    for (name, secrets) in legacy {
        let server = object_entry(object_entry(servers, to_legacy_category(name)), name);
        let known = list_known_hosts(Some(server));
        let host = match known.as_slice() {
            [only] => only.clone(),
            _ => DEFAULT_HOST_KEY.to_owned(),
        };
        let host_config = object_entry(object_entry(server, "hosts"), &host);
        let mut merged = object_or_empty(Some(secrets));
        merged.extend(object_or_empty(host_config.get("secrets")));
        host_config.insert("secrets".to_owned(), Value::Object(merged));
    }
    config
}
