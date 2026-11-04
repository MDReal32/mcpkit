use indexmap::IndexMap;
use serde_json::{Value, json};
use std::cell::RefCell;
use std::path::Path;
use std::rc::Rc;
use tempfile::TempDir;
use usemcpkit_auth::credentials::CredentialRequester;
use usemcpkit_auth::secret_file::FileSecretStore;
use usemcpkit_auth::{AuthContext, AuthError, AuthState, SecretOwner, ServerKey};
use usemcpkit_core::env::Env;
use usemcpkit_execution::upstream::{UpstreamAccess, with_upstream_access};
use usemcpkit_execution::{CallContext, DEFAULT_TIMEOUT, ExecutorState};
use usemcpkit_http::HttpResponse;
use usemcpkit_manifest::Manifest;
use usemcpkit_testing::FixedClient;
use usemcpkit_upstream::UpstreamError;

/// What the TypeScript `withUpstreamAccess` asked and started the Teams upstream with, given only `TEAMS_APP_ID` and a
/// form answer padded with spaces.
fn teams_golden() -> Value {
    let file = Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/fixtures/teams-forwarded-credentials.json");
    serde_json::from_str(&std::fs::read_to_string(file).unwrap()).unwrap()
}

fn built_manifest(path: &str) -> Manifest {
    let file =
        Path::new(env!("CARGO_MANIFEST_DIR")).join(format!("../../packages/servers/build/manifests/{path}.json"));
    serde_json::from_str(&std::fs::read_to_string(file).unwrap()).unwrap()
}

fn stdio_manifest(forward_env: &[&str], optional_env: &[&str]) -> Manifest {
    serde_json::from_value(json!({
        "name": "local",
        "category": "test",
        "version": "1.0.0",
        "description": "A local upstream",
        "baseUrl": "https://local.invalid",
        "upstream": { "type": "stdio", "command": "local-mcp", "forwardEnv": forward_env, "optionalEnv": optional_env },
        "tools": [],
    }))
    .unwrap()
}

fn context(home: &Path, env: &[(&str, &str)], requester: Option<CredentialRequester>) -> CallContext {
    CallContext {
        auth: AuthContext {
            env: Env::from_pairs(env.iter().copied()),
            home: home.to_path_buf(),
            http: Rc::new(FixedClient::new(HttpResponse::default())),
            on_authorization_url: None,
            project_dir: None,
            request_credentials: requester,
            secret_store: Some(Rc::new(FileSecretStore::new(home.to_path_buf()))),
            state: Rc::new(AuthState::default()),
        },
        timeout: DEFAULT_TIMEOUT,
        state: Rc::new(ExecutorState::default()),
    }
}

/// Answers the form with each field's key in lowercase, padded with spaces, and keeps the request it was shown.
fn padded_answers(asked: &Rc<RefCell<Vec<Value>>>) -> CredentialRequester {
    let asked = Rc::clone(asked);
    Rc::new(move |request| {
        let values: serde_json::Map<String, Value> = request.options[0]
            .fields
            .iter()
            .map(|field| (field.key.clone(), json!(format!("  {}  ", field.key.to_lowercase()))))
            .collect();
        asked.borrow_mut().push(serde_json::to_value(&request).unwrap());
        Box::pin(async move { Ok::<_, AuthError>(json!({ "method": "token", "option": 0, "values": values })) })
    })
}

fn owner(manifest: &Manifest) -> SecretOwner {
    SecretOwner {
        server: ServerKey::of(manifest),
        domain: None,
    }
}

async fn stored(context: &CallContext, manifest: &Manifest, name: &str) -> Option<String> {
    let store = context.auth.secret_store.as_ref().unwrap();
    store.get(&owner(manifest), name).await.unwrap()
}

async fn start(manifest: &Manifest, context: &CallContext) -> Result<UpstreamAccess, UpstreamError> {
    with_upstream_access(manifest, |access| Box::pin(async move { Ok(access) }), context).await
}

fn pairs(env: &IndexMap<String, String>) -> Vec<(String, String)> {
    env.iter().map(|(name, value)| (name.clone(), value.clone())).collect()
}

#[tokio::test]
async fn asks_for_missing_forwarded_credentials_with_the_form_the_typescript_cli_shows() {
    let home = TempDir::new().unwrap();
    let asked = Rc::new(RefCell::new(Vec::new()));
    let context = context(home.path(), &[("TEAMS_APP_ID", "app-1")], Some(padded_answers(&asked)));
    let manifest = built_manifest("communication/teams");
    let golden = teams_golden();

    let access = start(&manifest, &context).await.unwrap();

    assert_eq!(asked.borrow().as_slice(), [golden["request"].clone()]);
    let expected: Vec<(String, String)> = golden["env"]
        .as_object()
        .unwrap()
        .iter()
        .map(|(name, value)| (name.clone(), value.as_str().unwrap().to_owned()))
        .collect();
    assert_eq!(pairs(&access.env), expected);
    assert!(access.headers.is_empty());
}

#[tokio::test]
async fn saves_what_was_entered_only_once_the_upstream_started() {
    let home = TempDir::new().unwrap();
    let asked = Rc::new(RefCell::new(Vec::new()));
    let context = context(home.path(), &[("TEAMS_APP_ID", "app-1")], Some(padded_answers(&asked)));
    let manifest = built_manifest("communication/teams");

    let failed: Result<(), _> = with_upstream_access(
        &manifest,
        |_| Box::pin(async { Err(UpstreamError::new("the upstream did not start")) }),
        &context,
    )
    .await;
    let not_saved = stored(&context, &manifest, "TEAM_ID").await;
    start(&manifest, &context).await.unwrap();

    assert_eq!(failed, Err(UpstreamError::new("the upstream did not start")));
    assert_eq!(not_saved, None);
    assert_eq!(stored(&context, &manifest, "TEAM_ID").await.as_deref(), Some("team_id"));
    assert_eq!(
        stored(&context, &manifest, "TEAMS_APP_ID").await,
        None,
        "a credential from the env is not saved"
    );
}

#[tokio::test]
async fn names_the_missing_credentials_when_there_is_no_form() {
    let home = TempDir::new().unwrap();
    let context = context(home.path(), &[("TEAMS_APP_ID", "app-1")], None);

    let failed = start(&built_manifest("communication/teams"), &context).await;

    assert_eq!(
        failed,
        Err(UpstreamError::new(
            "teams: missing credential, set TEAMS_APP_PASSWORD, TEAMS_APP_TENANT_ID, TEAM_ID, TEAMS_CHANNEL_ID in the client's env for usemcpkit"
        ))
    );
}

#[tokio::test]
async fn takes_the_env_over_the_store_and_an_empty_env_var_as_unset() {
    let home = TempDir::new().unwrap();
    let manifest = stdio_manifest(&["FIRST", "SECOND"], &["SET", "STORED", "UNSET"]);
    let context = context(
        home.path(),
        &[("FIRST", "from-env"), ("SECOND", ""), ("SET", "on")],
        None,
    );
    let store = context.auth.secret_store.as_ref().unwrap();
    for name in ["FIRST", "SECOND", "STORED"] {
        store.set(&owner(&manifest), name, "from-store").await.unwrap();
    }

    let access = start(&manifest, &context).await.unwrap();

    assert_eq!(
        pairs(&access.env),
        [
            ("FIRST".to_owned(), "from-env".to_owned()),
            ("SECOND".to_owned(), "from-store".to_owned()),
            ("SET".to_owned(), "on".to_owned()),
            ("STORED".to_owned(), "from-store".to_owned()),
        ]
    );
}

fn two_token_manifest() -> Manifest {
    let mut manifest = serde_json::to_value(built_manifest("cloud/cloudflare")).unwrap();
    manifest["auth"] = json!([{ "type": "bearer", "env": "FIRST_TOKEN" }, { "type": "bearer", "env": "SECOND_TOKEN" }]);
    serde_json::from_value(manifest).unwrap()
}

#[tokio::test]
async fn moves_on_to_the_next_auth_option_after_a_401_and_tries_the_one_that_worked_first() {
    let home = TempDir::new().unwrap();
    let context = context(
        home.path(),
        &[("FIRST_TOKEN", "revoked"), ("SECOND_TOKEN", "valid")],
        None,
    );
    let manifest = two_token_manifest();
    let sent = Rc::new(RefCell::new(Vec::new()));
    let connect = |access: UpstreamAccess| {
        let sent = Rc::clone(&sent);
        Box::pin(async move {
            let authorization = access.headers.get("Authorization").cloned().unwrap_or_default();
            sent.borrow_mut().push(authorization.clone());
            match authorization.as_str() {
                "Bearer valid" => Ok(authorization),
                _ => Err(UpstreamError::Unauthorized(
                    "https://mcp.cloudflare.com/mcp answered 401".to_owned(),
                )),
            }
        }) as usemcpkit_core::LocalFuture<'static, _>
    };

    let first = with_upstream_access(&manifest, connect, &context).await;
    let second = with_upstream_access(&manifest, connect, &context).await;

    assert_eq!(first.as_deref(), Ok("Bearer valid"));
    assert_eq!(second.as_deref(), Ok("Bearer valid"));
    assert_eq!(*sent.borrow(), ["Bearer revoked", "Bearer valid", "Bearer valid"]);
}

#[tokio::test]
async fn stops_at_a_failure_that_is_not_a_401_and_lists_every_rejection_when_nothing_worked() {
    let home = TempDir::new().unwrap();
    let context = context(home.path(), &[("FIRST_TOKEN", "revoked")], None);
    let manifest = two_token_manifest();

    let broken: Result<(), _> = with_upstream_access(
        &manifest,
        |_| Box::pin(async { Err(UpstreamError::new("https://mcp.cloudflare.com/mcp answered 500")) }),
        &context,
    )
    .await;
    let refused: Result<(), _> = with_upstream_access(
        &manifest,
        |_| {
            Box::pin(async {
                Err(UpstreamError::Unauthorized(
                    "https://mcp.cloudflare.com/mcp answered 401".to_owned(),
                ))
            })
        },
        &context,
    )
    .await;

    assert_eq!(
        broken,
        Err(UpstreamError::new("https://mcp.cloudflare.com/mcp answered 500"))
    );
    let Err(UpstreamError::Failed(message)) = refused else {
        panic!("{refused:?}");
    };
    assert!(
        message.starts_with("cloudflare: no auth option worked\n  auth[0] "),
        "{message}"
    );
    assert!(
        message.contains(": https://mcp.cloudflare.com/mcp answered 401\n  auth[1] "),
        "{message}"
    );
}
