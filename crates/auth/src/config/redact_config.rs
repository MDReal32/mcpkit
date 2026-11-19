use crate::consts::{SERVERS_KEY, SIGN_IN_KEY};
use serde_json::{Map, Value};

/// What a secret is shown as, so the file can be pasted in an issue without the values.
pub const REDACTED: &str = "********";

/// The sign-in fields that hold a token.
const SIGN_IN_SECRETS: [&str; 2] = ["accessToken", "refreshToken"];

fn redact_values(values: &Map<String, Value>) -> Value {
    Value::Object(
        values
            .keys()
            .map(|key| (key.clone(), Value::String(REDACTED.to_owned())))
            .collect(),
    )
}

fn redact_host(host: &Value) -> Value {
    let Some(host) = host.as_object() else {
        return host.clone();
    };
    let mut redacted = host.clone();
    if let Some(Value::Object(secrets)) = host.get("secrets") {
        redacted.insert("secrets".to_owned(), redact_values(secrets));
    }
    Value::Object(redacted)
}

fn redact_server(server: &Value) -> Value {
    let Some(server) = server.as_object() else {
        return server.clone();
    };
    let mut redacted = server.clone();
    if let Some(Value::Object(hosts)) = server.get("hosts") {
        let hosts = hosts
            .iter()
            .map(|(name, host)| (name.clone(), redact_host(host)))
            .collect();
        redacted.insert("hosts".to_owned(), Value::Object(hosts));
    }
    if let Some(Value::Object(sign_in)) = server.get(SIGN_IN_KEY) {
        let mut sign_in = sign_in.clone();
        for key in SIGN_IN_SECRETS {
            if sign_in.contains_key(key) {
                sign_in.insert(key.to_owned(), Value::String(REDACTED.to_owned()));
            }
        }
        if let Some(Value::String(scope)) = sign_in.get("scope") {
            let count = scope.split_whitespace().count();
            sign_in.insert("scope".to_owned(), Value::String(format!("{count} scopes")));
        }
        redacted.insert(SIGN_IN_KEY.to_owned(), Value::Object(sign_in));
    }
    Value::Object(redacted)
}

/// The config with every saved secret and token masked and a long scope list counted; hosts, projects, times and
/// registered clients stay readable.
pub fn redact_config(config: &Map<String, Value>) -> Map<String, Value> {
    let mut redacted = config.clone();
    if let Some(Value::Object(servers)) = config.get(SERVERS_KEY) {
        let servers = servers
            .iter()
            .map(|(category, group)| {
                let group = group.as_object().map(|group| {
                    group
                        .iter()
                        .map(|(name, server)| (name.clone(), redact_server(server)))
                        .collect::<Map<String, Value>>()
                });
                (category.clone(), group.map_or_else(|| Value::Null, Value::Object))
            })
            .collect();
        redacted.insert(SERVERS_KEY.to_owned(), Value::Object(servers));
    }
    redacted
}

#[cfg(test)]
mod tests {
    use super::redact_config;
    use serde_json::{Value, json};

    #[test]
    fn masks_secrets_and_tokens_and_keeps_the_rest() {
        let config = json!({
            "version": 1,
            "servers": { "cloud": { "cloudflare": {
                "hosts": { "default": { "savedAt": "2026-11-18T09:12:00Z", "secrets": { "TOKEN": "t0ps3cret" } } },
                "signIn": { "accessToken": "a", "refreshToken": "r", "tokenType": "Bearer", "scope": "a b c", "expiresAt": "2026-11-18T10:00:00Z" },
            } } },
            "oauthClients": { "https://a": { "clientId": "c" } },
        });

        let redacted = Value::Object(redact_config(config.as_object().unwrap()));

        let server = &redacted["servers"]["cloud"]["cloudflare"];
        assert_eq!(server["hosts"]["default"]["secrets"]["TOKEN"], "********");
        assert_eq!(server["hosts"]["default"]["savedAt"], "2026-11-18T09:12:00Z");
        assert_eq!(server["signIn"]["accessToken"], "********");
        assert_eq!(server["signIn"]["refreshToken"], "********");
        assert_eq!(server["signIn"]["tokenType"], "Bearer");
        assert_eq!(server["signIn"]["scope"], "3 scopes");
        assert_eq!(redacted["oauthClients"], config["oauthClients"]);
    }
}
