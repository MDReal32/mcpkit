use mcpkit_auth::secret_file::FileSecretStore;
use mcpkit_auth::{SecretOwner, SecretStore, ServerKey};
use serde_json::{Value, json};
use std::path::{Path, PathBuf};
use tempfile::TempDir;

fn github(domain: Option<&str>) -> SecretOwner {
    SecretOwner {
        server: ServerKey::new("git", "github"),
        domain: domain.map(str::to_owned),
    }
}

fn jira() -> SecretOwner {
    SecretOwner {
        server: ServerKey::new("atlassian", "jira"),
        domain: None,
    }
}

fn config_file(home: &TempDir) -> PathBuf {
    home.path().join("config.json")
}

fn legacy_file(home: &TempDir) -> PathBuf {
    home.path().join("secrets.json")
}

fn write(file: &Path, value: Value) {
    std::fs::write(file, value.to_string()).unwrap();
}

fn read(file: &Path) -> Value {
    serde_json::from_str(&std::fs::read_to_string(file).unwrap()).unwrap()
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
        read(&config_file(&home)),
        json!({
            "version": 4,
            "servers": {
                "git": { "github": { "hosts": { "default": { "secrets": { "GITHUB_TOKEN": "ghp_1" } } } } },
                "atlassian": { "jira": { "hosts": { "default": { "secrets": { "JIRA_TOKEN": "jt" } } } } },
            },
        })
    );
    let text = std::fs::read_to_string(config_file(&home)).unwrap();
    assert!(text.starts_with("{\n  \"version\": 4,\n"), "{text}");
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
        "version": 4,
        "servers": { "git": { "github": { "hosts": { "default": { "secrets": { "GITHUB_TOKEN": 1 } } } } } },
    });
    write(&config_file(&home), malformed.clone());

    let error = store(&home).set(&github(None), "GITHUB_TOKEN", "x").await.unwrap_err();

    assert!(error.0.contains("not a valid mcpkit config file"), "{error}");
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
        json!({ "version": 4, "servers": { "git": { "github": { "hosts": { "ghe.example.com": {} } } } } }),
    );

    store(&home)
        .set(&github(Some("ghe.example.com")), "GITHUB_TOKEN", "ghp_1")
        .await
        .unwrap();

    assert_eq!(
        read(&config_file(&home)),
        json!({
            "version": 4,
            "servers": { "git": { "github": { "hosts": { "ghe.example.com": { "secrets": { "GITHUB_TOKEN": "ghp_1" } } } } } },
        })
    );
}

#[tokio::test]
async fn moves_an_old_secrets_json_into_the_config_file_and_removes_it() {
    let home = tempfile::tempdir().unwrap();
    write(&legacy_file(&home), json!({ "github": { "GITHUB_TOKEN": "old" } }));
    write(
        &config_file(&home),
        json!({ "version": 4, "servers": { "git": { "github": { "hosts": { "ghe.example.com": {} } } } } }),
    );

    let token = store(&home)
        .get(&github(Some("ghe.example.com")), "GITHUB_TOKEN")
        .await
        .unwrap();

    assert_eq!(token.as_deref(), Some("old"));
    assert_eq!(
        read(&config_file(&home)),
        json!({
            "version": 4,
            "servers": { "git": { "github": { "hosts": { "ghe.example.com": { "secrets": { "GITHUB_TOKEN": "old" } } } } } },
        })
    );
    assert!(!legacy_file(&home).exists());
}

#[tokio::test]
async fn upgrades_a_config_without_a_version_and_its_old_secrets_json_to_version_4() {
    let home = tempfile::tempdir().unwrap();
    write(
        &config_file(&home),
        json!({ "servers": { "github": { "domain": "ghe.example.com" }, "jira": {} } }),
    );
    write(
        &legacy_file(&home),
        json!({ "github": { "GITHUB_TOKEN": "old" }, "jira": { "JIRA_TOKEN": "jt" } }),
    );

    let token = store(&home).get(&jira(), "JIRA_TOKEN").await.unwrap();

    assert_eq!(token.as_deref(), Some("jt"));
    assert_eq!(
        read(&config_file(&home)),
        json!({
            "version": 4,
            "servers": {
                "git": { "github": { "hosts": { "ghe.example.com": { "secrets": { "GITHUB_TOKEN": "old" } } } } },
                "atlassian": { "jira": { "hosts": { "default": { "secrets": { "JIRA_TOKEN": "jt" } } } } },
            },
        })
    );
}

#[tokio::test]
async fn upgrades_a_version_1_config_that_keeps_secrets_per_server() {
    let home = tempfile::tempdir().unwrap();
    write(
        &config_file(&home),
        json!({ "servers": { "github": { "domain": "ghe.example.com", "secrets": { "GITHUB_TOKEN": "t" } } } }),
    );

    store(&home)
        .set(&github(Some("ghe.example.com")), "OTHER", "o")
        .await
        .unwrap();

    assert_eq!(
        read(&config_file(&home)),
        json!({
            "version": 4,
            "servers": {
                "git": { "github": { "hosts": { "ghe.example.com": { "secrets": { "GITHUB_TOKEN": "t", "OTHER": "o" } } } } },
            },
        })
    );
}

#[tokio::test]
async fn upgrades_a_version_2_config_by_dropping_the_last_used_domain_and_grouping_servers() {
    let home = tempfile::tempdir().unwrap();
    write(
        &config_file(&home),
        json!({
            "version": 2,
            "servers": {
                "github": { "domain": "ghe.example.com", "hosts": { "ghe.example.com": { "secrets": { "GITHUB_TOKEN": "t" } } } },
                "jira": { "domain": "jira.example.com" },
                "custom": { "hosts": { "default": { "secrets": { "CUSTOM_TOKEN": "c" } } } },
            },
        }),
    );

    let token = store(&home)
        .get(&github(Some("ghe.example.com")), "GITHUB_TOKEN")
        .await
        .unwrap();

    assert_eq!(token.as_deref(), Some("t"));
    assert_eq!(
        read(&config_file(&home)),
        json!({
            "version": 4,
            "servers": {
                "git": { "github": { "hosts": { "ghe.example.com": { "secrets": { "GITHUB_TOKEN": "t" } } } } },
                "atlassian": { "jira": { "hosts": { "jira.example.com": {} } } },
                "other": { "custom": { "hosts": { "default": { "secrets": { "CUSTOM_TOKEN": "c" } } } } },
            },
        })
    );
}

#[tokio::test]
async fn refuses_a_config_from_a_newer_mcpkit_instead_of_overwriting_it() {
    let home = tempfile::tempdir().unwrap();
    write(&config_file(&home), json!({ "version": 5, "servers": {} }));

    let error = store(&home).set(&github(None), "GITHUB_TOKEN", "x").await.unwrap_err();

    assert!(error.0.contains("update mcpkit"), "{error}");
    assert_eq!(read(&config_file(&home)), json!({ "version": 5, "servers": {} }));
}

#[tokio::test]
async fn keeps_hosts_and_projects_of_a_config_written_before_versions_existed() {
    let home = tempfile::tempdir().unwrap();
    let hosts = json!({ "gitlab.a.example": { "secrets": { "GITLAB_TOKEN": "t" } } });
    let projects = json!({ "/work/app": "gitlab.a.example" });
    write(
        &config_file(&home),
        json!({ "servers": { "gitlab": { "domain": "gitlab.a.example", "hosts": hosts, "projects": projects } } }),
    );
    let owner = SecretOwner {
        server: ServerKey::new("git", "gitlab"),
        domain: Some("gitlab.a.example".into()),
    };

    let token = store(&home).get(&owner, "GITLAB_TOKEN").await.unwrap();

    assert_eq!(token.as_deref(), Some("t"));
    assert_eq!(
        read(&config_file(&home)),
        json!({ "version": 4, "servers": { "git": { "gitlab": { "hosts": hosts, "projects": projects } } } })
    );
}

#[tokio::test]
async fn keeps_keys_it_does_not_know_about() {
    let home = tempfile::tempdir().unwrap();
    write(
        &config_file(&home),
        json!({ "version": 4, "future": { "a": 1 }, "servers": { "git": { "github": { "note": "kept" } } } }),
    );

    store(&home).set(&github(None), "GITHUB_TOKEN", "x").await.unwrap();

    assert_eq!(
        read(&config_file(&home)),
        json!({
            "version": 4,
            "future": { "a": 1 },
            "servers": { "git": { "github": { "note": "kept", "hosts": { "default": { "secrets": { "GITHUB_TOKEN": "x" } } } } } },
        })
    );
}
