use crate::config::update_server_config;
use crate::consts::{SAVED_AT_KEY, SIGN_IN_KEY};
use crate::oauth::now_epoch_ms;
use crate::timestamp::format_timestamp;
use crate::token_store::stored_token::StoredToken;
use crate::{AuthError, ServerKey};
use serde_json::Value;
use std::path::{Path, PathBuf};

/// Saves the token as the server's `signIn` in the config, with the time it was saved, and returns the config file.
pub async fn save_token(home: &Path, server: &ServerKey, token: &StoredToken) -> Result<PathBuf, AuthError> {
    let Value::Object(mut sign_in) = serde_json::to_value(token)
        .map_err(|error| AuthError(format!("cannot save the sign-in of {server}: {error}")))?
    else {
        return Err(AuthError(format!("cannot save the sign-in of {server}: not an object")));
    };
    sign_in.insert(SAVED_AT_KEY.to_owned(), Value::String(format_timestamp(now_epoch_ms())));
    update_server_config(home, server, |entry| {
        entry.insert(SIGN_IN_KEY.to_owned(), Value::Object(sign_in));
    })
    .await
}

#[cfg(test)]
mod tests {
    use super::save_token;
    use crate::ServerKey;
    use crate::config::config_file;
    use crate::token_store::{StoredToken, read_stored_token};
    use serde_json::{Value, json};

    #[tokio::test]
    async fn saves_the_sign_in_under_its_server_with_a_readable_expiry() {
        let home = tempfile::tempdir().unwrap();
        let server = ServerKey::new("cloud", "demo");
        let token = StoredToken {
            access_token: "a".into(),
            token_type: "Bearer".into(),
            refresh_token: None,
            expires_at: Some(1_700_000_000_000.0),
            scope: None,
            auth_key: Some("oauth https://auth.example.com/token".into()),
        };

        save_token(home.path(), &server, &token).await.unwrap();

        let saved: Value = serde_json::from_str(&std::fs::read_to_string(config_file(home.path())).unwrap()).unwrap();
        assert_eq!(
            saved["servers"]["cloud"]["demo"]["signIn"]["expiresAt"],
            json!("2023-11-14T22:13:20Z")
        );
        assert!(saved["servers"]["cloud"]["demo"]["signIn"]["savedAt"].is_string());
        assert_eq!(
            read_stored_token(home.path(), &server).await.unwrap(),
            Some(StoredToken {
                expires_at: Some(1_700_000_000_000.0),
                ..token
            })
        );
    }

    #[tokio::test]
    async fn refuses_a_sign_in_that_is_not_a_token_instead_of_overwriting_it() {
        let home = tempfile::tempdir().unwrap();
        let config = json!({
            "version": 1,
            "servers": { "cloud": { "demo": { "signIn": { "accessToken": "a", "tokenType": null } } } },
        });
        std::fs::write(config_file(home.path()), config.to_string()).unwrap();

        let error = read_stored_token(home.path(), &ServerKey::new("cloud", "demo"))
            .await
            .unwrap_err();

        assert!(error.0.contains("holds an invalid sign-in for cloud:demo"), "{error}");
    }
}
