use mcpkit_auth::oauth::{AuthorizationUrlHandler, sign_in, sign_in_once, to_code_challenge};
use mcpkit_auth::{AuthContext, AuthState};
use mcpkit_core::env::Env;
use mcpkit_http::{HttpClient, RequestBody};
use mcpkit_manifest::auth::{AuthSpec, OAuthAuth};
use mcpkit_testing::{DEMO_TOKEN_URL, RecordingClient, approve_sign_in, demo_oauth};
use serde_json::{Value, json};
use std::cell::RefCell;
use std::path::Path;
use std::rc::Rc;
use std::thread::JoinHandle;
use url::Url;
use url::form_urlencoded;

fn context(home: &Path, http: Rc<dyn HttpClient>) -> AuthContext {
    AuthContext {
        env: Env::default(),
        home: home.to_path_buf(),
        http,
        on_authorization_url: None,
        project_dir: None,
        secret_store: None,
        state: Rc::new(AuthState::default()),
    }
}

fn oauth(value: Value) -> OAuthAuth {
    let spec: AuthSpec = serde_json::from_value(value).unwrap();
    spec.as_interactive().unwrap().clone()
}

fn token_client() -> Rc<RecordingClient> {
    Rc::new(RecordingClient::new([(
        DEMO_TOKEN_URL.to_owned(),
        json!({ "access_token": "at-1", "token_type": "bearer", "refresh_token": "rt-1", "expires_in": 3600 }),
    )]))
}

/// Approves every authorization URL it is shown, remembering the URLs and the browser threads.
#[derive(Default)]
struct Browser {
    urls: RefCell<Vec<String>>,
    callbacks: RefCell<Vec<JoinHandle<String>>>,
}

impl Browser {
    fn handler(self: &Rc<Self>, state: Option<&'static str>) -> AuthorizationUrlHandler {
        let browser = Rc::clone(self);
        Rc::new(move |url: &str| {
            browser.urls.borrow_mut().push(url.to_owned());
            browser.callbacks.borrow_mut().push(approve_sign_in(url, state));
        })
    }

    fn statuses(&self) -> Vec<String> {
        self.callbacks
            .borrow_mut()
            .drain(..)
            .map(|callback| callback.join().unwrap())
            .collect()
    }
}

fn query_param(url: &str, name: &str) -> Option<String> {
    Url::parse(url)
        .unwrap()
        .query_pairs()
        .find(|(key, _)| key == name)
        .map(|(_, value)| value.into_owned())
}

fn form(body: &Option<RequestBody>) -> Vec<(String, String)> {
    let Some(RequestBody::Text(text)) = body else {
        panic!("the token request has no form body");
    };
    form_urlencoded::parse(text.as_bytes()).into_owned().collect()
}

fn form_value<'a>(form: &'a [(String, String)], name: &str) -> Option<&'a str> {
    form.iter()
        .find(|(key, _)| key == name)
        .map(|(_, value)| value.as_str())
}

#[tokio::test]
async fn runs_the_pkce_flow_through_the_loopback_callback_and_stores_the_token() {
    let home = tempfile::tempdir().unwrap();
    let http = token_client();
    let browser = Rc::new(Browser::default());

    let signed_in = sign_in(
        "demo",
        &oauth(demo_oauth()),
        &context(home.path(), http.clone()),
        &*browser.handler(None),
    )
    .await
    .unwrap();

    let url = browser.urls.borrow()[0].clone();
    assert_eq!(query_param(&url, "client_id").as_deref(), Some("client-1"));
    assert_eq!(query_param(&url, "scope").as_deref(), Some("repo user"));
    assert_eq!(query_param(&url, "code_challenge_method").as_deref(), Some("S256"));
    assert_eq!(browser.statuses(), ["HTTP/1.1 200 OK"]);
    let requests = http.requests.borrow();
    let form = form(&requests[0].body);
    assert_eq!(form_value(&form, "grant_type"), Some("authorization_code"));
    assert_eq!(form_value(&form, "code"), Some("code-1"));
    assert_eq!(
        form_value(&form, "redirect_uri"),
        query_param(&url, "redirect_uri").as_deref()
    );
    let verifier = form_value(&form, "code_verifier").unwrap();
    assert_eq!(Some(to_code_challenge(verifier)), query_param(&url, "code_challenge"));
    assert_eq!(signed_in.token.access_token, "at-1");
    assert_eq!(signed_in.tokens_file, home.path().join("tokens.json"));
    let tokens: Value = serde_json::from_str(&std::fs::read_to_string(&signed_in.tokens_file).unwrap()).unwrap();
    assert_eq!(tokens["demo"]["accessToken"], "at-1");
    assert_eq!(tokens["demo"]["refreshToken"], "rt-1");
    assert_eq!(tokens["demo"]["authKey"], format!("oauth {DEMO_TOKEN_URL}"));
}

#[tokio::test]
async fn adds_authorization_params_and_sends_the_client_over_http_basic_with_token_headers() {
    let home = tempfile::tempdir().unwrap();
    let http = token_client();
    let browser = Rc::new(Browser::default());
    let mut auth = demo_oauth();
    auth["authorizationParams"] = json!({ "duration": "permanent" });
    auth["clientAuthentication"] = json!("basic");
    auth["tokenHeaders"] = json!({ "User-Agent": "mcpkit-test" });

    sign_in(
        "demo",
        &oauth(auth),
        &context(home.path(), http.clone()),
        &*browser.handler(None),
    )
    .await
    .unwrap();

    assert_eq!(browser.statuses(), ["HTTP/1.1 200 OK"]);
    assert_eq!(
        query_param(&browser.urls.borrow()[0], "duration").as_deref(),
        Some("permanent")
    );
    let requests = http.requests.borrow();
    let header = |name: &str| requests[0].headers.get(name).map(String::as_str);
    assert_eq!(header("Authorization"), Some("Basic Y2xpZW50LTE6"));
    assert_eq!(header("User-Agent"), Some("mcpkit-test"));
    assert_eq!(form_value(&form(&requests[0].body), "client_id"), None);
}

#[tokio::test]
async fn rejects_a_callback_with_a_foreign_state() {
    let home = tempfile::tempdir().unwrap();
    let http = token_client();
    let browser = Rc::new(Browser::default());

    let error = sign_in(
        "demo",
        &oauth(demo_oauth()),
        &context(home.path(), http.clone()),
        &*browser.handler(Some("forged")),
    )
    .await
    .unwrap_err();

    assert_eq!(error.0, "demo: authorization state mismatch, sign-in aborted");
    assert_eq!(browser.statuses(), ["HTTP/1.1 200 OK"]);
    assert!(http.requests.borrow().is_empty());
    assert!(!home.path().join("tokens.json").exists());
}

#[tokio::test]
async fn shares_one_sign_in_between_concurrent_calls() {
    let home = tempfile::tempdir().unwrap();
    let http = token_client();
    let browser = Rc::new(Browser::default());
    let auth = oauth(demo_oauth());
    let context = context(home.path(), http.clone());
    let handler = browser.handler(None);

    let (first, second) = tokio::join!(
        sign_in_once("demo", &auth, &context, &handler),
        sign_in_once("demo", &auth, &context, &handler)
    );

    assert_eq!(first.unwrap().token.access_token, "at-1");
    assert_eq!(second.unwrap().token.access_token, "at-1");
    assert_eq!(browser.statuses(), ["HTTP/1.1 200 OK"]);
    assert_eq!(http.requests.borrow().len(), 1);
}
