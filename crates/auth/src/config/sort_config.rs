use crate::consts::{CONFIG_KEY_ORDER, SIGN_IN_KEY};
use serde_json::{Map, Value};

fn sort_value(value: Value, key: &str) -> Value {
    match value {
        Value::Object(object) if key == SIGN_IN_KEY => Value::Object(object),
        Value::Object(object) => Value::Object(sort_object(object)),
        other => other,
    }
}

fn sort_object(object: Map<String, Value>) -> Map<String, Value> {
    let mut entries: Vec<(String, Value)> = object.into_iter().collect();
    entries.sort_by(|(left, _), (right, _)| left.cmp(right));
    entries
        .into_iter()
        .map(|(key, value)| {
            let sorted = sort_value(value, &key);
            (key, sorted)
        })
        .collect()
}

/// The config with its keys in a fixed order, so the file reads and diffs the same every time: `version`, `servers` and
/// `oauthClients` first, then every key alphabetically at each level. A sign-in keeps the order of its own fields.
pub fn sort_config(config: Map<String, Value>) -> Map<String, Value> {
    let mut rest = sort_object(config);
    let mut sorted = Map::new();
    for key in CONFIG_KEY_ORDER {
        if let Some(value) = rest.shift_remove(key) {
            sorted.insert(key.to_owned(), value);
        }
    }
    sorted.extend(rest);
    sorted
}

#[cfg(test)]
mod tests {
    use super::sort_config;
    use serde_json::{Value, json};

    fn keys(value: &Value) -> Vec<&str> {
        value.as_object().unwrap().keys().map(String::as_str).collect()
    }

    #[test]
    fn puts_the_known_keys_first_and_sorts_the_rest() {
        let config = json!({
            "zeta": 1,
            "oauthClients": {},
            "servers": { "b": { "y": 1, "x": 1 }, "a": { "signIn": { "tokenType": "Bearer", "accessToken": "t" } } },
            "version": 1,
        });

        let sorted = Value::Object(sort_config(config.as_object().unwrap().clone()));

        assert_eq!(keys(&sorted), ["version", "servers", "oauthClients", "zeta"]);
        assert_eq!(keys(&sorted["servers"]), ["a", "b"]);
        assert_eq!(keys(&sorted["servers"]["b"]), ["x", "y"]);
        assert_eq!(keys(&sorted["servers"]["a"]["signIn"]), ["tokenType", "accessToken"]);
    }
}
