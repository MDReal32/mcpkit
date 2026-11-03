use mcpkit_auth::AuthError;
use mcpkit_auth::credentials::{
    CREDENTIALS_FORM_CANCEL_PATH, CREDENTIALS_FORM_IMPORT_PATH, CREDENTIALS_FORM_SESSION_HEADER,
    CREDENTIALS_FORM_SUBMIT_PATH, CredentialRequest,
};
use mcpkit_core::env::Env;
use mcpkit_credentials_form::{CREDENTIALS_FORM_TIMEOUT, CredentialsFormOptions, create_credentials_form};
use mcpkit_manifest::ui::DEFAULT_UI_TEXTS;
use serde_json::{Value, json};
use std::cell::RefCell;
use std::path::Path;
use std::rc::Rc;
use std::time::Duration;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::TcpStream;
use tokio::sync::oneshot;

const PAGE: &str = "<script type=\"application/json\" id=\"mcpkit-request\"></script><p>form</p>";

/// The page URL the form announced: its `host:port` and the session token from the fragment.
struct FormUrl {
    host: String,
    token: String,
}

struct HttpAnswer {
    status: u16,
    body: String,
}

fn texts() -> Value {
    Value::Object(
        DEFAULT_UI_TEXTS
            .iter()
            .map(|(key, text)| ((*key).to_owned(), json!(text)))
            .collect(),
    )
}

fn field(key: &str) -> Value {
    json!({ "key": key, "label": "Access token", "hint": "", "placeholder": "", "secret": true })
}

fn demo_request() -> CredentialRequest {
    serde_json::from_value(json!({
        "serverName": "demo",
        "texts": texts(),
        "options": [{ "index": 0, "label": "bearer DEMO_TOKEN", "fields": [field("DEMO_TOKEN")], "actions": [] }],
        "signIn": false,
    }))
    .unwrap()
}

fn github_request() -> CredentialRequest {
    serde_json::from_value(json!({
        "serverName": "github",
        "texts": texts(),
        "domain": { "label": "API host", "hint": "", "placeholder": "", "value": "api.github.com", "knownHosts": [] },
        "domainInUse": "api.github.com",
        "options": [{
            "index": 0,
            "label": "bearer GITHUB_TOKEN",
            "fields": [field("GITHUB_TOKEN")],
            "actions": [{
                "type": "cli",
                "label": "Use GitHub CLI",
                "command": "gh",
                "args": ["auth", "token", "--hostname", "{webHost}"],
            }],
        }],
        "signIn": false,
    }))
    .unwrap()
}

/// A folder holding the fake `gh`, for the form's PATH.
fn fake_gh_dir() -> tempfile::TempDir {
    let dir = tempfile::tempdir().unwrap();
    let gh = dir.path().join(format!("gh{}", std::env::consts::EXE_SUFFIX));
    std::fs::copy(env!("CARGO_BIN_EXE_fake-token-cli"), gh).unwrap();
    dir
}

fn path_env(dir: &Path) -> Env {
    Env::from_pairs([("PATH", dir.to_string_lossy().into_owned())])
}

/// Opens the form and hands back its announced URL and its answer, which resolve while the test talks to the page.
fn open_form(
    request: CredentialRequest,
    page: &str,
    timeout: Duration,
    env: Env,
) -> (
    oneshot::Receiver<FormUrl>,
    impl Future<Output = Result<Value, AuthError>>,
) {
    let (sender, announced) = oneshot::channel();
    let sender = Rc::new(RefCell::new(Some(sender)));
    let requester = create_credentials_form(CredentialsFormOptions {
        page: Rc::from(page),
        on_url: Rc::new(move |url: &str| {
            let (address, token) = url
                .strip_prefix("http://")
                .and_then(|rest| rest.split_once("/#"))
                .expect("the form URL is http://host/#token");
            let url = FormUrl {
                host: address.to_owned(),
                token: token.to_owned(),
            };
            if let Some(sender) = sender.borrow_mut().take() {
                assert!(sender.send(url).is_ok(), "the test stopped listening for the URL");
            }
        }),
        timeout,
        env,
    });
    (announced, requester(request))
}

async fn send(host: &str, request_line: &str, headers: &[(&str, &str)], body: &str) -> HttpAnswer {
    let mut stream = TcpStream::connect(host).await.unwrap();
    let mut head = format!(
        "{request_line} HTTP/1.1\r\ncontent-length: {}\r\nconnection: close\r\n",
        body.len()
    );
    for (name, value) in headers {
        head.push_str(&format!("{name}: {value}\r\n"));
    }
    stream.write_all(format!("{head}\r\n{body}").as_bytes()).await.unwrap();
    let mut raw = String::new();
    stream.read_to_string(&mut raw).await.unwrap();
    let (head, body) = raw.split_once("\r\n\r\n").unwrap();
    HttpAnswer {
        status: head.split(' ').nth(1).unwrap().parse().unwrap(),
        body: body.to_owned(),
    }
}

async fn call_api(url: &FormUrl, path: &str, body: &Value) -> HttpAnswer {
    let headers = [
        ("host", url.host.as_str()),
        (CREDENTIALS_FORM_SESSION_HEADER, url.token.as_str()),
    ];
    send(&url.host, &format!("POST {path}"), &headers, &body.to_string()).await
}

async fn read_injected_request(url: &FormUrl) -> Value {
    let page = send(&url.host, "GET /", &[("host", url.host.as_str())], "").await;
    assert_eq!(page.status, 200);
    let start = page.body.find("id=\"mcpkit-request\">").unwrap() + "id=\"mcpkit-request\">".len();
    let end = page.body[start..].find("</script>").unwrap() + start;
    serde_json::from_str(&page.body[start..end]).unwrap()
}

fn errors(answer: &HttpAnswer) -> Value {
    serde_json::from_str::<Value>(&answer.body).unwrap()["errors"].clone()
}

#[tokio::test]
async fn serves_the_page_with_the_request_injected_then_resolves_with_a_valid_answer() {
    let (announced, answer) = open_form(demo_request(), PAGE, CREDENTIALS_FORM_TIMEOUT, Env::default());
    let submitted = json!({ "method": "token", "option": 0, "values": { "DEMO_TOKEN": "abc" } });
    let page = async {
        let url = announced.await.unwrap();
        assert_eq!(
            read_injected_request(&url).await,
            serde_json::to_value(demo_request()).unwrap()
        );
        assert_eq!(
            call_api(&url, CREDENTIALS_FORM_SUBMIT_PATH, &submitted).await.status,
            200
        );
    };

    let (answer, ()) = tokio::join!(answer, page);

    assert_eq!(answer, Ok(submitted));
}

#[tokio::test]
async fn answers_invalid_submissions_with_errors_and_keeps_waiting_until_cancelled() {
    let (announced, answer) = open_form(demo_request(), PAGE, CREDENTIALS_FORM_TIMEOUT, Env::default());
    let page = async {
        let url = announced.await.unwrap();
        let rejected = call_api(
            &url,
            CREDENTIALS_FORM_SUBMIT_PATH,
            &json!({ "method": "token", "option": 0, "values": {} }),
        )
        .await;
        assert_eq!(rejected.status, 400);
        assert_eq!(errors(&rejected), json!(["Access token is required"]));
        assert_eq!(
            call_api(&url, CREDENTIALS_FORM_CANCEL_PATH, &json!({})).await.status,
            200
        );
    };

    let (answer, ()) = tokio::join!(answer, page);

    assert_eq!(
        answer,
        Err(AuthError::new("the credentials form was closed without an answer"))
    );
}

#[tokio::test]
async fn refuses_api_calls_without_the_session_token_and_requests_for_another_host() {
    let (announced, answer) = open_form(demo_request(), PAGE, CREDENTIALS_FORM_TIMEOUT, Env::default());
    let page = async {
        let url = announced.await.unwrap();
        let without_token = send(
            &url.host,
            &format!("POST {CREDENTIALS_FORM_SUBMIT_PATH}"),
            &[("host", url.host.as_str())],
            "{}",
        )
        .await;
        assert_eq!(without_token.status, 403);
        let rebound = send(&url.host, "GET /", &[("host", "evil.example.com")], "").await;
        assert_eq!(rebound.status, 403);
        assert_eq!(
            errors(&rebound),
            json!(["this request does not belong to the open credentials form"])
        );
        call_api(&url, CREDENTIALS_FORM_CANCEL_PATH, &json!({})).await;
    };

    let (answer, ()) = tokio::join!(answer, page);

    assert!(answer.is_err());
}

#[tokio::test]
async fn fails_when_the_page_has_no_request_element() {
    let (_announced, answer) = open_form(demo_request(), "<p>x</p>", CREDENTIALS_FORM_TIMEOUT, Env::default());

    let error = answer.await.unwrap_err();

    assert!(error.0.contains("mcpkit-request"), "{error}");
}

#[tokio::test]
async fn gives_up_after_the_timeout() {
    let (_announced, answer) = open_form(demo_request(), PAGE, Duration::from_millis(20), Env::default());

    assert_eq!(answer.await, Err(AuthError::new("the credentials form timed out")));
}

#[tokio::test]
async fn imports_a_token_from_the_github_cli_and_answers_the_form_with_it() {
    let bin = fake_gh_dir();
    let (announced, answer) = open_form(github_request(), PAGE, CREDENTIALS_FORM_TIMEOUT, path_env(bin.path()));
    let page = async {
        let url = announced.await.unwrap();
        assert_eq!(
            read_injected_request(&url).await,
            serde_json::to_value(github_request()).unwrap()
        );
        let import = |domain: &str| json!({ "option": 0, "action": 0, "domain": domain });
        let refused = call_api(&url, CREDENTIALS_FORM_IMPORT_PATH, &import("ghe.example.com/api/v3")).await;
        assert_eq!(refused.status, 400);
        assert_eq!(
            errors(&refused),
            json!(["gh: no oauth token found for ghe.example.com"])
        );
        let malformed = call_api(&url, CREDENTIALS_FORM_IMPORT_PATH, &import("not a host")).await;
        assert_eq!(malformed.status, 400);
        let imported = call_api(&url, CREDENTIALS_FORM_IMPORT_PATH, &import(" api.github.com ")).await;
        assert_eq!(imported.status, 200);
    };

    let (answer, ()) = tokio::join!(answer, page);

    assert_eq!(
        answer,
        Ok(json!({
            "method": "token",
            "option": 0,
            "values": { "GITHUB_TOKEN": "gho_from_cli" },
            "domain": "api.github.com",
        }))
    );
}

#[tokio::test]
async fn hides_the_cli_button_and_refuses_the_import_when_the_cli_is_not_on_path() {
    let empty = tempfile::tempdir().unwrap();
    let (announced, answer) = open_form(github_request(), PAGE, CREDENTIALS_FORM_TIMEOUT, path_env(empty.path()));
    let page = async {
        let url = announced.await.unwrap();
        let shown = read_injected_request(&url).await;
        assert_eq!(shown["options"][0]["actions"], json!([]));
        let refused = call_api(
            &url,
            CREDENTIALS_FORM_IMPORT_PATH,
            &json!({ "option": 0, "action": 0, "domain": "api.github.com" }),
        )
        .await;
        assert_eq!(refused.status, 400);
        assert_eq!(
            errors(&refused),
            json!(["this credential cannot be fetched automatically"])
        );
        call_api(&url, CREDENTIALS_FORM_CANCEL_PATH, &json!({})).await;
    };

    let (answer, ()) = tokio::join!(answer, page);

    assert!(answer.is_err());
}
