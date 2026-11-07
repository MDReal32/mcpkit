use serde_json::{Value, json};
use std::path::Path;
use std::rc::Rc;
use url::Url;
use usemcpkit_auth::oauth::{AuthorizationUrlHandler, read_fresh_access_token, sign_in, sign_in_once};
use usemcpkit_auth::token_store::read_stored_token;
use usemcpkit_auth::{AuthContext, AuthState};
use usemcpkit_core::env::Env;
use usemcpkit_http::{HttpClient, RequestBody};
use usemcpkit_manifest::auth::{AuthSpec, OAuthAuth};
use usemcpkit_testing::{RecordingClient, approve_sign_in};

const RESOURCE: &str = "https://mcp.example.com/mcp";
const PROTECTED_RESOURCE_URL: &str = "https://mcp.example.com/.well-known/oauth-protected-resource/mcp";
const METADATA_URL: &str = "https://auth.example.com/.well-known/oauth-authorization-server";
const TOKEN_URL: &str = "https://auth.example.com/token";
const REGISTER_URL: &str = "https://auth.example.com/register";

fn context(home: &Path, http: Rc<dyn HttpClient>) -> AuthContext {
    AuthContext {
        env: Env::default(),
        home: home.to_path_buf(),
        http,
        on_authorization_url: None,
        project_dir: None,
        request_credentials: None,
        secret_store: None,
        state: Rc::new(AuthState::default()),
    }
}

fn discovering() -> OAuthAuth {
    let spec: AuthSpec = serde_json::from_value(json!({ "type": "oauth", "discovery": RESOURCE })).unwrap();
    spec.as_interactive().unwrap().clone()
}

fn server(registration: bool) -> Rc<RecordingClient> {
    let mut metadata = json!({
        "issuer": "https://auth.example.com",
        "authorization_endpoint": "https://auth.example.com/authorize",
        "token_endpoint": TOKEN_URL,
        "code_challenge_methods_supported": ["S256"],
    });
    if registration {
        metadata["registration_endpoint"] = json!(REGISTER_URL);
    }
    Rc::new(RecordingClient::new([
        (
            PROTECTED_RESOURCE_URL.to_owned(),
            json!({ "authorization_servers": ["https://auth.example.com"] }),
        ),
        (METADATA_URL.to_owned(), metadata),
        (REGISTER_URL.to_owned(), json!({ "client_id": "dynamic-1" })),
        (
            TOKEN_URL.to_owned(),
            json!({ "access_token": "at-1", "token_type": "bearer", "refresh_token": "rt-1", "expires_in": 3600 }),
        ),
    ]))
}

fn approving() -> AuthorizationUrlHandler {
    Rc::new(|url: &str| {
        approve_sign_in(url, None);
    })
}

fn form_value(body: &Option<RequestBody>, name: &str) -> Option<String> {
    let Some(RequestBody::Text(text)) = body else {
        return None;
    };
    url::form_urlencoded::parse(text.as_bytes())
        .find(|(key, _)| key == name)
        .map(|(_, value)| value.into_owned())
}

fn query_param(url: &str, name: &str) -> Option<String> {
    Url::parse(url)
        .unwrap()
        .query_pairs()
        .find(|(key, _)| key == name)
        .map(|(_, value)| value.into_owned())
}

#[tokio::test]
async fn discovers_the_endpoints_registers_a_client_and_signs_in_with_it() {
    let home = tempfile::tempdir().unwrap();
    let http = server(true);
    let shown = Rc::new(std::cell::RefCell::new(Vec::new()));
    let recorder = Rc::clone(&shown);
    let handler: AuthorizationUrlHandler = Rc::new(move |url: &str| {
        recorder.borrow_mut().push(url.to_owned());
        approve_sign_in(url, None);
    });

    let signed_in = sign_in("demo", &discovering(), &context(home.path(), http.clone()), &*handler)
        .await
        .unwrap();

    let url = shown.borrow()[0].clone();
    assert!(url.starts_with("https://auth.example.com/authorize?"), "{url}");
    assert_eq!(query_param(&url, "client_id").as_deref(), Some("dynamic-1"));
    let requests = http.requests.borrow();
    let registration = requests.iter().find(|request| request.url == REGISTER_URL).unwrap();
    let Some(RequestBody::Text(body)) = &registration.body else {
        panic!("the registration has no body");
    };
    let body: Value = serde_json::from_str(body).unwrap();
    assert_eq!(body["token_endpoint_auth_method"], "none");
    assert_eq!(
        body["redirect_uris"],
        json!([query_param(&url, "redirect_uri").unwrap()])
    );
    let token_request = requests.iter().find(|request| request.url == TOKEN_URL).unwrap();
    assert_eq!(
        form_value(&token_request.body, "client_id").as_deref(),
        Some("dynamic-1")
    );
    assert_eq!(
        signed_in.token.auth_key.as_deref(),
        Some(format!("oauth {RESOURCE}").as_str())
    );
    let saved: Value =
        serde_json::from_str(&std::fs::read_to_string(home.path().join("oauth-clients.json")).unwrap()).unwrap();
    assert_eq!(saved["https://auth.example.com"]["clientId"], "dynamic-1");
}

#[tokio::test]
async fn refreshes_with_the_client_the_sign_in_registered() {
    let home = tempfile::tempdir().unwrap();
    let http = server(true);
    let context = context(home.path(), http.clone());
    let auth = discovering();
    let handler = approving();

    sign_in_once("demo", &auth, &context, &handler).await.unwrap();
    let mut stored = read_stored_token(home.path(), "demo").await.unwrap().unwrap();
    stored.expires_at = Some(1.0);
    let refreshed = read_fresh_access_token("demo", &auth, &stored, &context).await.unwrap();

    assert_eq!(refreshed, "at-1");
    let requests = http.requests.borrow();
    let registrations = requests.iter().filter(|request| request.url == REGISTER_URL).count();
    assert_eq!(registrations, 1);
    let refresh = requests
        .iter()
        .filter(|request| request.url == TOKEN_URL)
        .find(|request| form_value(&request.body, "grant_type").as_deref() == Some("refresh_token"))
        .unwrap();
    assert_eq!(form_value(&refresh.body, "client_id").as_deref(), Some("dynamic-1"));
    assert_eq!(form_value(&refresh.body, "refresh_token").as_deref(), Some("rt-1"));
}

#[tokio::test]
async fn asks_for_a_client_id_when_the_server_cannot_register_clients() {
    let home = tempfile::tempdir().unwrap();
    let http = server(false);

    let error = sign_in("demo", &discovering(), &context(home.path(), http), &*approving())
        .await
        .unwrap_err();

    assert!(error.0.contains("does not register clients by itself"), "{error}");
    assert!(!home.path().join("tokens.json").exists());
}

#[tokio::test]
async fn names_a_server_that_publishes_no_metadata() {
    let home = tempfile::tempdir().unwrap();
    let http = Rc::new(RecordingClient::new([]));

    let error = sign_in("demo", &discovering(), &context(home.path(), http), &*approving())
        .await
        .unwrap_err();

    assert!(
        error.0.contains("publishes no authorization server metadata"),
        "{error}"
    );
}
