use serde_json::{Value, json};
use std::path::{Path, PathBuf};
use tempfile::TempDir;
use usemcpkit_auth::ServerKey;
use usemcpkit_auth::config::load_config;
use usemcpkit_auth::token_store::read_stored_token;

fn path(home: &TempDir, name: &str) -> PathBuf {
    home.path().join(name)
}

fn write(file: &Path, value: Value) {
    std::fs::write(file, value.to_string()).unwrap();
}

fn read(file: &Path) -> Value {
    serde_json::from_str(&std::fs::read_to_string(file).unwrap()).unwrap()
}

#[tokio::test]
async fn folds_the_old_tokens_and_oauth_clients_files_into_the_config_and_removes_them() {
    let home = tempfile::tempdir().unwrap();
    write(
        &path(&home, "config.json"),
        json!({
            "version": 1,
            "servers": { "cloud": { "cloudflare": { "hosts": { "default": { "secrets": {} } } } } },
        }),
    );
    write(
        &path(&home, "tokens.json"),
        json!({
            "cloudflare": {
                "accessToken": "at",
                "tokenType": "Bearer",
                "refreshToken": "rt",
                "expiresAt": 1_700_000_000_000_i64,
                "authKey": "oauth https://mcp.cloudflare.com",
            },
        }),
    );
    write(
        &path(&home, "oauth-clients.json"),
        json!({ "https://mcp.cloudflare.com": { "clientId": "c", "redirectUri": "http://127.0.0.1:1/callback" } }),
    );

    let config = load_config(home.path()).await.unwrap();

    assert_eq!(
        read(&path(&home, "config.json")),
        json!({
            "version": 1,
            "servers": {
                "cloud": {
                    "cloudflare": {
                        "hosts": { "default": { "secrets": {} } },
                        "signIn": {
                            "accessToken": "at",
                            "authKey": "oauth https://mcp.cloudflare.com",
                            "expiresAt": "2023-11-14T22:13:20Z",
                            "refreshToken": "rt",
                            "tokenType": "Bearer",
                        },
                    },
                },
            },
            "oauthClients": {
                "https://mcp.cloudflare.com": { "clientId": "c", "redirectUri": "http://127.0.0.1:1/callback" },
            },
        })
    );
    assert!(config.contains_key("oauthClients"));
    assert!(!path(&home, "tokens.json").exists());
    assert!(!path(&home, "oauth-clients.json").exists());
    let token = read_stored_token(home.path(), &ServerKey::new("cloud", "cloudflare"))
        .await
        .unwrap()
        .unwrap();
    assert_eq!(token.expires_at, Some(1_700_000_000_000.0));
}

#[tokio::test]
async fn reads_a_config_without_a_version_as_version_1() {
    let home = tempfile::tempdir().unwrap();
    write(&path(&home, "config.json"), json!({ "servers": {} }));

    let config = load_config(home.path()).await.unwrap();

    assert_eq!(config["version"], 1);
}
