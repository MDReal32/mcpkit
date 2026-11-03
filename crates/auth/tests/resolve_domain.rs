use mcpkit_auth::domain::resolve_domain;
use mcpkit_auth::{AuthContext, AuthState};
use mcpkit_core::env::Env;
use mcpkit_http::HttpResponse;
use mcpkit_manifest::Manifest;
use mcpkit_testing::FixedClient;
use serde_json::{Value, json};
use std::path::{Path, PathBuf};
use std::process::Command;
use std::rc::Rc;
use tempfile::TempDir;

fn gitlab(match_git_remote: bool) -> Manifest {
    serde_json::from_value(json!({
        "name": "gitlab",
        "category": "git",
        "description": "test",
        "version": "1.0.0",
        "baseUrl": "https://{domain}/api",
        "domain": { "default": "gitlab.com", "env": "GITLAB_HOST", "matchGitRemote": match_git_remote },
        "tools": [],
    }))
    .unwrap()
}

fn context(home: &TempDir, env: &[(&str, &str)], project_dir: Option<PathBuf>) -> AuthContext {
    AuthContext {
        env: Env::from_pairs(env.iter().copied()),
        home: home.path().to_path_buf(),
        http: Rc::new(FixedClient::new(HttpResponse::default())),
        on_authorization_url: None,
        project_dir,
        request_credentials: None,
        secret_store: None,
        state: Rc::new(AuthState::default()),
    }
}

fn git(dir: &Path, args: &[&str]) -> String {
    let output = Command::new("git").args(args).current_dir(dir).output().unwrap();
    assert!(output.status.success(), "git {args:?} failed");
    String::from_utf8(output.stdout).unwrap().trim().to_owned()
}

fn create_repo(home: &TempDir, name: &str, remote: &str) -> PathBuf {
    let dir = home.path().join(name);
    std::fs::create_dir_all(&dir).unwrap();
    git(&dir, &["init", "-q"]);
    git(&dir, &["remote", "add", "origin", remote]);
    dir
}

fn save_config(home: &TempDir, servers: Value) {
    let config = json!({ "version": 4, "servers": { "git": servers } });
    std::fs::write(home.path().join("config.json"), config.to_string()).unwrap();
}

fn two_hosts() -> Value {
    json!({ "gitlab": { "hosts": { "gitlab.a.example": {}, "gitlab.b.example": {} } } })
}

#[tokio::test]
async fn picks_the_known_host_the_git_remote_points_at() {
    let home = tempfile::tempdir().unwrap();
    save_config(&home, two_hosts());
    let project_dir = create_repo(&home, "repo-b", "git@gitlab.b.example:team/app.git");

    let domain = resolve_domain(&gitlab(true), &context(&home, &[], Some(project_dir))).await;

    assert_eq!(domain, Ok(Some("gitlab.b.example".to_owned())));
}

#[tokio::test]
async fn asks_when_the_remote_cannot_tell_and_the_project_is_not_bound() {
    let home = tempfile::tempdir().unwrap();
    save_config(&home, two_hosts());
    let project_dir = create_repo(&home, "repo-x", "https://other.example/team/app.git");

    let domain = resolve_domain(&gitlab(true), &context(&home, &[], Some(project_dir))).await;

    assert_eq!(domain, Ok(None));
}

#[tokio::test]
async fn uses_the_host_a_project_was_bound_to() {
    let home = tempfile::tempdir().unwrap();
    let project_dir = create_repo(&home, "repo-j", "https://other.example/team/app.git");
    let key = git(&project_dir, &["rev-parse", "--show-toplevel"]);
    let mut servers = two_hosts();
    servers["gitlab"]["projects"] = json!({ key: "gitlab.b.example" });
    save_config(&home, servers);

    let domain = resolve_domain(&gitlab(false), &context(&home, &[], Some(project_dir))).await;

    assert_eq!(domain, Ok(Some("gitlab.b.example".to_owned())));
}

#[tokio::test]
async fn lets_the_env_var_win_and_asks_which_host_without_a_project() {
    let home = tempfile::tempdir().unwrap();
    save_config(&home, two_hosts());
    let env = [("GITLAB_HOST", "env.example")];

    let from_env = resolve_domain(&gitlab(true), &context(&home, &env, Some(home.path().to_path_buf()))).await;
    let without_project = resolve_domain(&gitlab(true), &context(&home, &[], None)).await;

    assert_eq!(from_env, Ok(Some("env.example".to_owned())));
    assert_eq!(without_project, Ok(None));
}

#[tokio::test]
async fn uses_the_only_host_or_the_default_and_checks_the_value() {
    let home = tempfile::tempdir().unwrap();

    let default = resolve_domain(&gitlab(false), &context(&home, &[], None)).await;
    save_config(&home, json!({ "gitlab": { "hosts": { "gitlab.a.example": {} } } }));
    let only = resolve_domain(&gitlab(false), &context(&home, &[], None)).await;
    let invalid = resolve_domain(&gitlab(false), &context(&home, &[("GITLAB_HOST", "https://x")], None)).await;

    assert_eq!(default, Ok(Some("gitlab.com".to_owned())));
    assert_eq!(only, Ok(Some("gitlab.a.example".to_owned())));
    assert_eq!(
        invalid.unwrap_err().0,
        "gitlab: domain \"https://x\" must look like host[:port][/path]"
    );
}
