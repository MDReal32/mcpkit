use crate::consts::{OAUTH_CLIENTS_KEY, SERVERS_KEY, SIGN_IN_KEY, UNKNOWN_CATEGORY};
use crate::json::object_entry;
use crate::timestamp::format_timestamp;
use serde_json::{Map, Value};

/// The category of the server of that name in the config, or the unknown one when it has no entry yet.
fn find_category(config: &Map<String, Value>, name: &str) -> String {
    config
        .get(SERVERS_KEY)
        .and_then(Value::as_object)
        .and_then(|servers| {
            servers
                .iter()
                .find(|(_, group)| group.get(name).is_some_and(Value::is_object))
                .map(|(category, _)| category.clone())
        })
        .unwrap_or_else(|| UNKNOWN_CATEGORY.to_owned())
}

/// An old token with `expiresAt` as epoch milliseconds, written the way a sign-in is saved now.
fn convert_legacy_token(token: &Value) -> Value {
    let mut converted = token.as_object().cloned().unwrap_or_default();
    if let Some(expires_at) = converted.get("expiresAt").and_then(Value::as_f64) {
        converted.insert("expiresAt".to_owned(), Value::String(format_timestamp(expires_at)));
    }
    Value::Object(converted)
}

/// Files the tokens of the old tokens file under their servers as `signIn`; a sign-in already in the config wins.
pub fn fold_legacy_tokens(mut config: Map<String, Value>, tokens: &Map<String, Value>) -> Map<String, Value> {
    for (name, token) in tokens {
        let category = find_category(&config, name);
        let server = object_entry(object_entry(object_entry(&mut config, SERVERS_KEY), &category), name);
        server.entry(SIGN_IN_KEY).or_insert_with(|| convert_legacy_token(token));
    }
    config
}

/// Adds the registrations of the old clients file under `oauthClients`; one already in the config wins.
pub fn fold_legacy_clients(mut config: Map<String, Value>, clients: &Map<String, Value>) -> Map<String, Value> {
    let registrations = object_entry(&mut config, OAUTH_CLIENTS_KEY);
    for (issuer, registration) in clients {
        registrations
            .entry(issuer.clone())
            .or_insert_with(|| registration.clone());
    }
    config
}

#[cfg(test)]
mod tests {
    use super::{fold_legacy_clients, fold_legacy_tokens};
    use serde_json::{Value, json};

    fn fold_tokens(config: Value, tokens: Value) -> Value {
        Value::Object(fold_legacy_tokens(
            config.as_object().unwrap().clone(),
            tokens.as_object().unwrap(),
        ))
    }

    #[test]
    fn files_a_token_under_the_category_of_its_server_and_writes_the_expiry_as_a_time() {
        let config = json!({ "version": 1, "servers": { "cloud": { "cloudflare": { "hosts": {} } } } });
        let tokens = json!({
            "cloudflare": { "accessToken": "a", "tokenType": "Bearer", "expiresAt": 1_700_000_000_000_i64 },
            "stray": { "accessToken": "s", "tokenType": "Bearer" },
        });

        let folded = fold_tokens(config, tokens);

        assert_eq!(
            folded["servers"]["cloud"]["cloudflare"]["signIn"],
            json!({ "accessToken": "a", "tokenType": "Bearer", "expiresAt": "2023-11-14T22:13:20Z" })
        );
        assert_eq!(folded["servers"]["cloud"]["cloudflare"]["hosts"], json!({}));
        assert_eq!(folded["servers"]["other"]["stray"]["signIn"]["accessToken"], "s");
    }

    #[test]
    fn keeps_a_sign_in_and_a_client_that_the_config_already_has() {
        let config = json!({
            "servers": { "cloud": { "cloudflare": { "signIn": { "accessToken": "new", "tokenType": "Bearer" } } } },
            "oauthClients": { "https://a": { "clientId": "kept" } },
        });
        let tokens = json!({ "cloudflare": { "accessToken": "old", "tokenType": "Bearer" } });

        let folded = fold_tokens(config, tokens);
        let clients = json!({ "https://a": { "clientId": "old" }, "https://b": { "clientId": "added" } });
        let with_clients = fold_legacy_clients(folded.as_object().unwrap().clone(), clients.as_object().unwrap());

        assert_eq!(folded["servers"]["cloud"]["cloudflare"]["signIn"]["accessToken"], "new");
        assert_eq!(with_clients["oauthClients"]["https://a"]["clientId"], "kept");
        assert_eq!(with_clients["oauthClients"]["https://b"]["clientId"], "added");
    }
}
