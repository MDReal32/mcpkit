use serde_json::{Value, json};
use std::path::{Path, PathBuf};
use tempfile::TempDir;
use usemcpkit_auth::secret_file::FileSecretStore;
use usemcpkit_auth::{SecretOwner, SecretStore, ServerKey};

fn github(domain: Option<&str>) -> SecretOwner {
    SecretOwner {
        server: ServerKey::new("git", "github"),
        domain: domain.map(str::to_owned),
    }
}

fn jira() -> SecretOwner {
    SecretOwner {
        server: ServerKey::new("orgs/atlassian", "jira"),
        domain: None,
    }
}

fn config_file(home: &TempDir) -> PathBuf {
    home.path().join("config.json")
}

fn write(file: &Path, value: Value) {
    std::fs::write(file, value.to_string()).unwrap();
}

fn read(file: &Path) -> Value {
    serde_json::from_str(&std::fs::read_to_string(file).unwrap()).unwrap()
}

fn without_saved_at(value: Value) -> Value {
    match value {
        Value::Object(object) => Value::Object(
            object
                .into_iter()
                .filter(|(key, _)| key != "savedAt")
                .map(|(key, value)| (key, without_saved_at(value)))
                .collect(),
        ),
        other => other,
    }
}

fn read_without_saved_at(file: &Path) -> Value {
    without_saved_at(read(file))
}

fn store(home: &TempDir) -> FileSecretStore {
    FileSecretStore::new(home.path().to_path_buf())
}

#[tokio::test]
async fn returns_none_when_nothing_is_saved() {
    let home = tempfile::tempdir().unwrap();

    assert_eq!(store(&home).get(&github(None), "GITHUB_TOKEN").await.unwrap(), None);
}

#[tokio::test]
async fn saves_plain_text_by_server_and_key_in_a_private_file() {
    let home = tempfile::tempdir().unwrap();
    let store = store(&home);

    store.set(&github(None), "GITHUB_TOKEN", "ghp_1").await.unwrap();
    store.set(&jira(), "JIRA_TOKEN", "jt").await.unwrap();

    assert_eq!(
        read_without_saved_at(&config_file(&home)),
        json!({
            "version": 1,
            "servers": {
                "git": { "github": { "hosts": { "default": { "secrets": { "GITHUB_TOKEN": "ghp_1" } } } } },
                "orgs/atlassian": { "jira": { "hosts": { "default": { "secrets": { "JIRA_TOKEN": "jt" } } } } },
            },
        })
    );
    let text = std::fs::read_to_string(config_file(&home)).unwrap();
    assert!(text.starts_with("{\n  \"version\": 1,\n"), "{text}");
    assert!(text.ends_with("}\n"), "{text}");
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let mode = std::fs::metadata(config_file(&home)).unwrap().permissions().mode();
        assert_eq!(mode & 0o777, 0o600);
    }
}

#[tokio::test]
async fn keeps_concurrent_saves_and_sees_saves_from_other_stores() {
    let home = tempfile::tempdir().unwrap();
    let first = store(&home);
    let second = store(&home);
    let owner = github(None);

    let (a, b) = tokio::join!(first.set(&owner, "A", "1"), first.set(&owner, "B", "2"));
    a.unwrap();
    b.unwrap();

    assert_eq!(second.get(&owner, "A").await.unwrap().as_deref(), Some("1"));
    assert_eq!(second.get(&owner, "B").await.unwrap().as_deref(), Some("2"));
}

#[tokio::test]
async fn fails_on_a_malformed_file_instead_of_overwriting_it() {
    let home = tempfile::tempdir().unwrap();
    let malformed = json!({
        "version": 1,
        "servers": { "git": { "github": { "hosts": { "default": { "secrets": { "GITHUB_TOKEN": 1 } } } } } },
    });
    write(&config_file(&home), malformed.clone());

    let error = store(&home).set(&github(None), "GITHUB_TOKEN", "x").await.unwrap_err();

    assert!(error.0.contains("not a valid usemcpkit config file"), "{error}");
    assert_eq!(read(&config_file(&home)), malformed);
}

#[tokio::test]
async fn keeps_the_secrets_of_each_host_apart() {
    let home = tempfile::tempdir().unwrap();
    let store = store(&home);

    store
        .set(&github(Some("ghe.example.com")), "GITHUB_TOKEN", "ghp_1")
        .await
        .unwrap();
    store
        .set(&github(Some("api.github.com")), "GITHUB_TOKEN", "ghp_2")
        .await
        .unwrap();

    let read_token = |domain| {
        let store = &store;
        async move { store.get(&github(domain), "GITHUB_TOKEN").await.unwrap() }
    };
    assert_eq!(read_token(Some("ghe.example.com")).await.as_deref(), Some("ghp_1"));
    assert_eq!(read_token(Some("api.github.com")).await.as_deref(), Some("ghp_2"));
    assert_eq!(read_token(None).await, None);
}

#[tokio::test]
async fn keeps_the_secrets_under_the_host_of_a_server() {
    let home = tempfile::tempdir().unwrap();
    write(
        &config_file(&home),
        json!({ "version": 1, "servers": { "git": { "github": { "hosts": { "ghe.example.com": {} } } } } }),
    );

    store(&home)
        .set(&github(Some("ghe.example.com")), "GITHUB_TOKEN", "ghp_1")
        .await
        .unwrap();

    assert_eq!(
        read_without_saved_at(&config_file(&home)),
        json!({
            "version": 1,
            "servers": { "git": { "github": { "hosts": { "ghe.example.com": { "secrets": { "GITHUB_TOKEN": "ghp_1" } } } } } },
        })
    );
}

#[tokio::test]
async fn refuses_a_config_from_a_newer_usemcpkit_instead_of_overwriting_it() {
    let home = tempfile::tempdir().unwrap();
    write(&config_file(&home), json!({ "version": 2, "servers": {} }));

    let error = store(&home).set(&github(None), "GITHUB_TOKEN", "x").await.unwrap_err();

    assert!(error.0.contains("update usemcpkit"), "{error}");
    assert_eq!(read(&config_file(&home)), json!({ "version": 2, "servers": {} }));
}

#[tokio::test]
async fn keeps_keys_it_does_not_know_about() {
    let home = tempfile::tempdir().unwrap();
    write(
        &config_file(&home),
        json!({ "version": 1, "future": { "a": 1 }, "servers": { "git": { "github": { "note": "kept" } } } }),
    );

    store(&home).set(&github(None), "GITHUB_TOKEN", "x").await.unwrap();

    assert_eq!(
        read_without_saved_at(&config_file(&home)),
        json!({
            "version": 1,
            "future": { "a": 1 },
            "servers": { "git": { "github": { "note": "kept", "hosts": { "default": { "secrets": { "GITHUB_TOKEN": "x" } } } } } },
        })
    );
}

#[tokio::test]
async fn writes_sorted_keys_and_stamps_when_the_secrets_of_a_host_were_saved() {
    let home = tempfile::tempdir().unwrap();
    let store = store(&home);

    store.set(&jira(), "JIRA_TOKEN", "jt").await.unwrap();
    store.set(&github(None), "GITHUB_TOKEN", "ghp_1").await.unwrap();

    let text = std::fs::read_to_string(config_file(&home)).unwrap();
    let order = |needle: &str| text.find(needle).unwrap();
    assert!(order("\"version\"") < order("\"servers\""), "{text}");
    assert!(order("\"git\"") < order("\"orgs/atlassian\""), "{text}");
    let saved_at = &read(&config_file(&home))["servers"]["git"]["github"]["hosts"]["default"]["savedAt"];
    assert!(saved_at.as_str().is_some_and(|time| time.ends_with('Z')), "{saved_at}");
}
