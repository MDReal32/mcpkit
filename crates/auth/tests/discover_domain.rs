//! The host of a local program that picks its port at start, found from its env var or its log.

use serde_json::{Value, json};
use std::path::Path;
use std::rc::Rc;
use std::time::{Duration, UNIX_EPOCH};
use tempfile::TempDir;
use usemcpkit_auth::domain::resolve_domain;
use usemcpkit_auth::{AuthContext, AuthState};
use usemcpkit_core::env::Env;
use usemcpkit_http::HttpResponse;
use usemcpkit_manifest::Manifest;
use usemcpkit_testing::FixedClient;

const LOG_PATTERN: &str = "Responding at http://127\\.0\\.0\\.1:(\\d+)";

fn ide(logs: &Path) -> Manifest {
    serde_json::from_value(json!({
        "name": "ide",
        "category": "test",
        "description": "test",
        "version": "1.0.0",
        "baseUrl": "https://{domain}",
        "domain": {
            "loopbackHttp": true,
            "discover": {
                "host": "127.0.0.1",
                "ports": [
                    { "type": "env", "name": "IDE_PORT" },
                    { "type": "log", "files": [format!("{}/idea*.log", logs.display())], "pattern": LOG_PATTERN },
                ],
            },
        },
        "upstream": { "type": "http", "url": "{domain}/stream" },
        "tools": [],
    }))
    .unwrap()
}

fn context(home: &TempDir, env: &[(&str, &str)]) -> AuthContext {
    AuthContext {
        env: Env::from_pairs(env.iter().copied()),
        home: home.path().to_path_buf(),
        http: Rc::new(FixedClient::new(HttpResponse::default())),
        on_authorization_url: None,
        project_dir: None,
        request_credentials: None,
        secret_store: None,
        state: Rc::new(AuthState::default()),
    }
}

fn write_log(logs: &Path, name: &str, text: &str, modified: u64) {
    let path = logs.join(name);
    std::fs::write(&path, text).unwrap();
    let file = std::fs::File::options().write(true).open(&path).unwrap();
    file.set_modified(UNIX_EPOCH + Duration::from_secs(modified)).unwrap();
}

fn save_host(home: &TempDir, host: &str) {
    let config = json!({ "version": 1, "servers": { "test": { "ide": { "hosts": { host: {} } } } } });
    std::fs::write(home.path().join("config.json"), config.to_string()).unwrap();
}

async fn resolve(manifest: &Manifest, context: &AuthContext) -> Option<String> {
    resolve_domain(manifest, context).await.unwrap()
}

#[tokio::test]
async fn takes_the_port_from_the_env_var_first() {
    let (home, logs) = (TempDir::new().unwrap(), TempDir::new().unwrap());
    write_log(logs.path(), "idea.log", "Responding at http://127.0.0.1:1111\n", 100);

    let domain = resolve(&ide(logs.path()), &context(&home, &[("IDE_PORT", "2222")])).await;

    assert_eq!(domain.as_deref(), Some("127.0.0.1:2222"));
}

#[tokio::test]
async fn reads_the_last_match_of_the_newest_log_that_has_one() {
    let (home, logs) = (TempDir::new().unwrap(), TempDir::new().unwrap());
    write_log(logs.path(), "idea.2.log", "Responding at http://127.0.0.1:1111\n", 100);
    write_log(
        logs.path(),
        "idea.1.log",
        "Responding at http://127.0.0.1:3333\nother line\nResponding at http://127.0.0.1:4444\n",
        200,
    );
    write_log(logs.path(), "idea.log", "nothing here\n", 300);

    let domain = resolve(&ide(logs.path()), &context(&home, &[])).await;

    assert_eq!(domain.as_deref(), Some("127.0.0.1:4444"));
}

#[tokio::test]
async fn ignores_an_env_var_that_is_not_a_port() {
    let (home, logs) = (TempDir::new().unwrap(), TempDir::new().unwrap());
    write_log(logs.path(), "idea.log", "Responding at http://127.0.0.1:5555\n", 100);

    let domain = resolve(&ide(logs.path()), &context(&home, &[("IDE_PORT", "abc")])).await;

    assert_eq!(domain.as_deref(), Some("127.0.0.1:5555"));
}

#[tokio::test]
async fn prefers_the_discovered_host_to_a_saved_one() {
    let (home, logs) = (TempDir::new().unwrap(), TempDir::new().unwrap());
    save_host(&home, "127.0.0.1:9999");
    write_log(logs.path(), "idea.log", "Responding at http://127.0.0.1:6666\n", 100);

    let domain = resolve(&ide(logs.path()), &context(&home, &[])).await;

    assert_eq!(domain.as_deref(), Some("127.0.0.1:6666"));
}

#[tokio::test]
async fn falls_back_to_the_saved_host_when_nothing_is_found() {
    let (home, logs) = (TempDir::new().unwrap(), TempDir::new().unwrap());
    save_host(&home, "127.0.0.1:9999");

    let domain = resolve(&ide(logs.path()), &context(&home, &[])).await;

    assert_eq!(domain.as_deref(), Some("127.0.0.1:9999"));
}

#[tokio::test]
async fn has_no_domain_when_nothing_is_found_and_none_is_saved() {
    let (home, logs) = (TempDir::new().unwrap(), TempDir::new().unwrap());

    assert_eq!(resolve(&ide(logs.path()), &context(&home, &[])).await, None);
}

#[tokio::test]
async fn reports_an_invalid_log_pattern() {
    let (home, logs) = (TempDir::new().unwrap(), TempDir::new().unwrap());
    write_log(logs.path(), "idea.log", "x\n", 100);
    let mut manifest: Value = serde_json::to_value(ide(logs.path())).unwrap();
    manifest["domain"]["discover"]["ports"][1]["pattern"] = json!("(");
    let manifest: Manifest = serde_json::from_value(manifest).unwrap();

    let error = resolve_domain(&manifest, &context(&home, &[])).await.unwrap_err();

    assert!(error.0.contains("log pattern \"(\" is invalid"), "{}", error.0);
}
