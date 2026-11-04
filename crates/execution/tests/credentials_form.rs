use serde_json::{Map, Value, json};
use std::cell::RefCell;
use std::path::Path;
use std::rc::Rc;
use std::thread::JoinHandle;
use url::Url;
use usemcpkit_auth::credentials::{CredentialRequest, CredentialRequester};
use usemcpkit_auth::secret_file::FileSecretStore;
use usemcpkit_auth::{AuthContext, AuthState, SecretOwner, ServerKey};
use usemcpkit_core::env::Env;
use usemcpkit_execution::{CallContext, DEFAULT_TIMEOUT, ExecutorState, execute_tool};
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::ui::DEFAULT_UI_TEXTS;
use usemcpkit_testing::{TokenCheckingClient, approve_sign_in, demo_oauth, ping_manifest};

const GHE_TOKEN_URL: &str = "https://ghe.example.com/token";

/// Each authorization URL shown, with the thread that approves it.
type ShownSignIns = Rc<RefCell<Vec<(String, JoinHandle<String>)>>>;

struct Form {
    requests: Rc<RefCell<Vec<CredentialRequest>>>,
    requester: CredentialRequester,
}

/// A form that records every request and answers each with `response` once the caller has yielded.
fn answer_with(response: Value) -> Form {
    let requests = Rc::new(RefCell::new(Vec::new()));
    let recorded = Rc::clone(&requests);
    let requester: CredentialRequester = Rc::new(move |request| {
        recorded.borrow_mut().push(request);
        let response = response.clone();
        Box::pin(async move {
            tokio::task::yield_now().await;
            Ok(response)
        })
    });
    Form { requests, requester }
}

fn token_auth() -> Value {
    json!([{ "type": "bearer", "env": "DEMO_TOKEN" }])
}

fn domain_manifest(name: &str, auth: Value) -> Manifest {
    let mut manifest = serde_json::to_value(ping_manifest(name, Some(auth))).unwrap();
    manifest["baseUrl"] = json!("https://{domain}/api");
    manifest["domain"] = json!({ "label": "API host", "default": "api.example.com", "env": "DEMO_DOMAIN" });
    serde_json::from_value(manifest).unwrap()
}

fn http(valid_token: &str) -> Rc<TokenCheckingClient> {
    Rc::new(TokenCheckingClient::new(
        valid_token,
        [(
            GHE_TOKEN_URL.to_owned(),
            json!({ "access_token": "signed-in", "token_type": "bearer" }),
        )],
    ))
}

fn call_context(home: &Path, env: &[(&str, &str)], http: Rc<TokenCheckingClient>, form: &Form) -> CallContext {
    CallContext {
        auth: AuthContext {
            env: Env::from_pairs(env.iter().copied()),
            home: home.to_path_buf(),
            http,
            on_authorization_url: None,
            project_dir: None,
            request_credentials: Some(Rc::clone(&form.requester)),
            secret_store: Some(Rc::new(FileSecretStore::new(home.to_path_buf()))),
            state: Rc::new(AuthState::default()),
        },
        timeout: DEFAULT_TIMEOUT,
        state: Rc::new(ExecutorState::default()),
    }
}

async fn call_ping(manifest: &Manifest, context: &CallContext) -> Result<Option<Value>, String> {
    execute_tool(manifest, &manifest.tools[0], Some(&Map::new()), context)
        .await
        .map_err(|error| error.0)
}

async fn saved_secret(context: &CallContext, manifest: &Manifest, domain: Option<&str>, key: &str) -> Option<String> {
    let owner = SecretOwner {
        server: ServerKey::of(manifest),
        domain: domain.map(str::to_owned),
    };
    let store = context.auth.secret_store.as_ref().unwrap();
    store.get(&owner, key).await.unwrap()
}

fn sent_hosts(http: &TokenCheckingClient) -> Vec<String> {
    http.sent_urls
        .borrow()
        .iter()
        .map(|url| Url::parse(url).unwrap().host_str().unwrap().to_owned())
        .collect()
}

fn pong() -> Result<Option<Value>, String> {
    Ok(Some(json!({ "pong": true })))
}

#[tokio::test]
async fn asks_for_a_token_when_none_is_provided_saves_it_once_the_api_accepts_it_and_reuses_it() {
    let home = tempfile::tempdir().unwrap();
    let form = answer_with(json!({ "method": "token", "option": 0, "values": { "DEMO_TOKEN": " typed " } }));
    let http = http("typed");
    let context = call_context(home.path(), &[], Rc::clone(&http), &form);
    let manifest = ping_manifest("asks", Some(token_auth()));

    assert_eq!(call_ping(&manifest, &context).await, pong());
    assert_eq!(call_ping(&manifest, &context).await, pong());

    let requests = form.requests.take();
    assert_eq!(requests.len(), 1);
    let request = &requests[0];
    assert_eq!(request.server_name, "asks");
    assert_eq!(request.text("title"), "Connect asks");
    assert_eq!(request.text("savedTitle"), "asks is connected");
    assert!(request.text("signingInBody").contains("access to asks"));
    assert_eq!(request.texts.len(), DEFAULT_UI_TEXTS.len());
    assert_eq!(
        serde_json::to_value(&request.options).unwrap(),
        json!([{
            "index": 0,
            "label": "bearer DEMO_TOKEN",
            "fields": [{
                "key": "DEMO_TOKEN",
                "label": "Access token",
                "hint": "Or set the DEMO_TOKEN environment variable.",
                "placeholder": "",
                "secret": true,
            }],
            "actions": [],
        }])
    );
    assert!(!request.sign_in);
    assert_eq!(*http.sent_authorizations.borrow(), ["Bearer typed", "Bearer typed"]);
    assert_eq!(
        saved_secret(&context, &manifest, None, "DEMO_TOKEN").await.as_deref(),
        Some("typed")
    );
}

#[tokio::test]
async fn uses_the_env_var_without_asking() {
    let home = tempfile::tempdir().unwrap();
    let form = answer_with(json!({ "method": "token", "option": 0, "values": { "DEMO_TOKEN": "typed" } }));
    let context = call_context(home.path(), &[("DEMO_TOKEN", "from-env")], http("from-env"), &form);

    assert_eq!(
        call_ping(&ping_manifest("env_wins", Some(token_auth())), &context).await,
        pong()
    );
    assert!(form.requests.borrow().is_empty());
}

#[tokio::test]
async fn does_not_save_a_token_the_api_rejects() {
    let home = tempfile::tempdir().unwrap();
    let form = answer_with(json!({ "method": "token", "option": 0, "values": { "DEMO_TOKEN": "wrong" } }));
    let context = call_context(home.path(), &[], http("right"), &form);
    let manifest = ping_manifest("rejected", Some(token_auth()));

    let error = call_ping(&manifest, &context).await.unwrap_err();

    assert!(
        error.contains("credentials form: API answered 401: Bad credentials"),
        "{error}"
    );
    assert_eq!(saved_secret(&context, &manifest, None, "DEMO_TOKEN").await, None);
    assert!(!home.path().join("config.json").exists());
}

#[tokio::test]
async fn shares_one_open_form_between_concurrent_calls() {
    let home = tempfile::tempdir().unwrap();
    let form = answer_with(json!({ "method": "token", "option": 0, "values": { "DEMO_TOKEN": "typed" } }));
    let context = call_context(home.path(), &[], http("typed"), &form);
    let manifest = ping_manifest("shared", Some(token_auth()));

    let results = futures_util::future::join_all([
        call_ping(&manifest, &context),
        call_ping(&manifest, &context),
        call_ping(&manifest, &context),
    ])
    .await;

    assert_eq!(results, [pong(), pong(), pong()]);
    assert_eq!(form.requests.borrow().len(), 1);
}

#[tokio::test]
async fn fills_the_domain_from_the_form_prefilled_with_the_default_and_saves_it() {
    let home = tempfile::tempdir().unwrap();
    let form = answer_with(json!({
        "method": "token",
        "option": 0,
        "values": { "DEMO_TOKEN": "typed" },
        "domain": "ghe.example.com",
    }));
    let http = http("typed");
    let context = call_context(home.path(), &[], Rc::clone(&http), &form);
    let manifest = domain_manifest("custom_domain", token_auth());

    assert_eq!(call_ping(&manifest, &context).await, pong());
    assert_eq!(call_ping(&manifest, &context).await, pong());

    let requests = form.requests.take();
    assert_eq!(requests.len(), 1);
    assert_eq!(
        serde_json::to_value(&requests[0].domain).unwrap(),
        json!({
            "label": "API host",
            "hint": requests[0].text("domainHint"),
            "placeholder": requests[0].text("domainPlaceholder"),
            "value": "api.example.com",
            "knownHosts": [],
        })
    );
    assert_eq!(sent_hosts(&http), ["ghe.example.com", "ghe.example.com"]);
    assert_eq!(
        saved_secret(&context, &manifest, Some("ghe.example.com"), "DEMO_TOKEN")
            .await
            .as_deref(),
        Some("typed")
    );
    let config: Value =
        serde_json::from_str(&std::fs::read_to_string(home.path().join("config.json")).unwrap()).unwrap();
    let hosts = config["servers"]["test"]["custom_domain"]["hosts"].as_object().unwrap();
    assert_eq!(hosts.keys().collect::<Vec<_>>(), ["ghe.example.com"]);
}

#[tokio::test]
async fn takes_the_domain_from_its_env_var_and_then_does_not_offer_it_in_the_form() {
    let home = tempfile::tempdir().unwrap();
    let form = answer_with(json!({ "method": "token", "option": 0, "values": { "DEMO_TOKEN": "typed" } }));
    let http = http("typed");
    let context = call_context(
        home.path(),
        &[("DEMO_DOMAIN", "env.example.com")],
        Rc::clone(&http),
        &form,
    );

    assert_eq!(
        call_ping(&domain_manifest("env_domain", token_auth()), &context).await,
        pong()
    );
    assert_eq!(form.requests.borrow()[0].domain, None);
    assert_eq!(sent_hosts(&http), ["env.example.com"]);
}

#[tokio::test]
async fn signs_in_with_oauth2_against_the_chosen_domain() {
    let home = tempfile::tempdir().unwrap();
    let mut oauth = demo_oauth();
    oauth["authorizationUrl"] = json!("https://{domain}/authorize");
    oauth["tokenUrl"] = json!(GHE_TOKEN_URL.replace("ghe.example.com", "{domain}"));
    let form = answer_with(json!({ "method": "sign-in", "domain": "ghe.example.com" }));
    let http = http("signed-in");
    let mut context = call_context(home.path(), &[], Rc::clone(&http), &form);
    let callbacks: ShownSignIns = Rc::new(RefCell::new(Vec::new()));
    let shown = Rc::clone(&callbacks);
    context.auth.on_authorization_url = Some(Rc::new(move |url: &str| {
        shown.borrow_mut().push((url.to_owned(), approve_sign_in(url, None)));
    }));
    let manifest = domain_manifest(
        "form_sign_in",
        json!([oauth, { "type": "bearer", "env": "DEMO_TOKEN" }]),
    );

    assert_eq!(call_ping(&manifest, &context).await, pong());

    let callbacks: Vec<_> = callbacks.borrow_mut().drain(..).collect();
    assert_eq!(callbacks.len(), 1);
    for (url, callback) in callbacks {
        assert_eq!(Url::parse(&url).unwrap().host_str(), Some("ghe.example.com"));
        assert_eq!(callback.join().unwrap(), "HTTP/1.1 200 OK");
    }
    assert!(form.requests.borrow()[0].sign_in);
    assert_eq!(sent_hosts(&http), ["ghe.example.com"]);
}

#[tokio::test]
async fn fails_with_the_reason_when_the_answer_does_not_fit_the_request() {
    let home = tempfile::tempdir().unwrap();
    let form = answer_with(json!({ "method": "token", "option": 3, "values": {} }));
    let context = call_context(home.path(), &[], http("typed"), &form);

    let error = call_ping(&ping_manifest("bad_answer", Some(token_auth())), &context)
        .await
        .unwrap_err();

    assert!(
        error.contains("invalid credentials form answer: choose one of the offered credentials"),
        "{error}"
    );
}
