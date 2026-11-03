use crate::AuthError;
use crate::files::write_json_file;
use crate::token_store::read_tokens::read_tokens;
use crate::token_store::stored_token::StoredToken;
use crate::token_store::tokens_file::tokens_file;
use serde_json::Value;
use std::path::{Path, PathBuf};

pub async fn save_token(home: &Path, server_name: &str, token: &StoredToken) -> Result<PathBuf, AuthError> {
    let file = tokens_file(home);
    let mut tokens = read_tokens(&file).await?;
    let value = serde_json::to_value(token).map_err(|error| AuthError(format!("{} {error}", file.display())))?;
    tokens.insert(server_name.to_owned(), value);
    write_json_file(&file, &Value::Object(tokens)).await?;
    Ok(file)
}

#[cfg(test)]
mod tests {
    use super::save_token;
    use crate::token_store::{StoredToken, read_stored_token, tokens_file};
    use serde_json::json;

    #[tokio::test]
    async fn keeps_other_entries_and_reads_float_expiry() {
        let home = tempfile::tempdir().unwrap();
        let other = json!({ "accessToken": "o", "tokenType": "Bearer", "expiresAt": 1700000000000.5, "extra": 1 });
        std::fs::write(tokens_file(home.path()), json!({ "other": other }).to_string()).unwrap();
        let token = StoredToken {
            access_token: "a".into(),
            token_type: "Bearer".into(),
            refresh_token: None,
            expires_at: Some(1700000000000.0),
            scope: None,
            auth_key: Some("oauth https://auth.example.com/token".into()),
        };

        save_token(home.path(), "demo", &token).await.unwrap();

        let text = std::fs::read_to_string(tokens_file(home.path())).unwrap();
        assert!(text.contains("\"expiresAt\": 1700000000000,\n"), "{text}");
        let saved: serde_json::Value = serde_json::from_str(&text).unwrap();
        assert_eq!(saved["other"], other);
        assert_eq!(read_stored_token(home.path(), "demo").await.unwrap(), Some(token));
        let other_token = read_stored_token(home.path(), "other").await.unwrap().unwrap();
        assert_eq!(other_token.expires_at, Some(1700000000000.5));
    }

    #[tokio::test]
    async fn refuses_a_malformed_tokens_file() {
        let home = tempfile::tempdir().unwrap();
        std::fs::write(
            tokens_file(home.path()),
            r#"{ "demo": { "accessToken": "a", "tokenType": null } }"#,
        )
        .unwrap();

        let error = read_stored_token(home.path(), "demo").await.unwrap_err();

        assert!(error.0.ends_with("tokens.json is not a valid tokens file"), "{error}");
    }
}
