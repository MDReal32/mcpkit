use indexmap::IndexMap;
use mcpkit_core::LocalFuture;
use mcpkit_core::env::Env;
use mcpkit_http::{HttpClient, HttpError, HttpRequest, HttpResponse, RequestBody};
use mcpkit_manifest::tool::HttpMethod;
use mcpkit_manifest::upstream::{HttpUpstream, UpstreamSpec};
use mcpkit_upstream::{UpstreamError, UpstreamOptions, connect_upstream};
use serde_json::{Value, json};
use std::cell::RefCell;
use std::rc::Rc;
use std::time::Duration;

const URL: &str = "http://127.0.0.1:9/mcp";

/// Answers like the TypeScript test's server: a session id on `initialize`, event-stream replies after it, 202 for a
/// notification, 204 for the closing DELETE; every request is recorded.
struct FakeMcpServer {
    status: u16,
    requests: RefCell<Vec<HttpRequest>>,
}

impl FakeMcpServer {
    fn new(status: u16) -> Rc<Self> {
        Rc::new(FakeMcpServer {
            status,
            requests: RefCell::new(Vec::new()),
        })
    }

    fn answer(&self, request: &HttpRequest) -> HttpResponse {
        let empty = |status| HttpResponse {
            status,
            ..HttpResponse::default()
        };
        if self.status != 200 {
            return empty(self.status);
        }
        if request.method == HttpMethod::Delete {
            return empty(204);
        }
        let message: Value = match &request.body {
            Some(RequestBody::Text(text)) => serde_json::from_str(text).unwrap(),
            _ => panic!("a POST without a JSON body"),
        };
        let Some(id) = message.get("id").cloned() else {
            return empty(202);
        };
        if message["method"] == "initialize" {
            return HttpResponse {
                status: 200,
                content_type: Some("application/json".to_owned()),
                headers: vec![("mcp-session-id".to_owned(), "session-1".to_owned())],
                body: json!({ "jsonrpc": "2.0", "id": id, "result": { "capabilities": {} } })
                    .to_string()
                    .into_bytes(),
            };
        }
        let result = match message["method"].as_str() {
            Some("tools/list") => json!({ "tools": [{ "name": "search", "description": "Searches" }] }),
            _ => {
                json!({ "content": [{ "type": "text", "text": format!("ran {}", message["params"]["name"].as_str().unwrap()) }] })
            }
        };
        let reply = json!({ "jsonrpc": "2.0", "id": id, "result": result });
        HttpResponse {
            status: 200,
            content_type: Some("text/event-stream".to_owned()),
            headers: Vec::new(),
            body: format!("event: message\ndata: {reply}\n\n").into_bytes(),
        }
    }
}

impl HttpClient for FakeMcpServer {
    fn send<'a>(
        &'a self,
        request: &'a HttpRequest,
        _timeout: Duration,
    ) -> LocalFuture<'a, Result<HttpResponse, HttpError>> {
        self.requests.borrow_mut().push(request.clone());
        let response = self.answer(request);
        Box::pin(async move { Ok(response) })
    }
}

fn http_spec() -> UpstreamSpec {
    UpstreamSpec::Http(HttpUpstream {
        url: URL.to_owned(),
        naming: None,
    })
}

fn options(server: &Rc<FakeMcpServer>) -> UpstreamOptions {
    let mut options = UpstreamOptions::new(Rc::clone(server) as Rc<dyn HttpClient>, Env::default());
    options.headers = IndexMap::from([
        ("Authorization".to_owned(), "Bearer t-1".to_owned()),
        ("accept".to_owned(), "text/plain".to_owned()),
    ]);
    options
}

#[tokio::test]
async fn keeps_the_session_signs_requests_and_reads_event_stream_replies() {
    let server = FakeMcpServer::new(200);
    let connection = connect_upstream(&http_spec(), &options(&server)).await.unwrap();

    let tools = connection.list_tools().await.unwrap();
    let result = connection
        .call_tool("search", json!({ "q": "x" }).as_object().cloned())
        .await
        .unwrap();
    connection.close().await;

    assert_eq!(tools, vec![json!({ "name": "search", "description": "Searches" })]);
    assert_eq!(result, json!({ "content": [{ "type": "text", "text": "ran search" }] }));
    let requests = server.requests.borrow();
    let listing = requests
        .iter()
        .find(|request| matches!(&request.body, Some(RequestBody::Text(text)) if text.contains("tools/list")))
        .unwrap();
    assert_eq!(
        listing.headers.get("mcp-session-id").map(String::as_str),
        Some("session-1")
    );
    assert_eq!(
        listing.headers.get("Authorization").map(String::as_str),
        Some("Bearer t-1")
    );
    assert_eq!(
        listing.headers.get("Accept").map(String::as_str),
        Some("application/json, text/event-stream")
    );
    assert!(
        !listing.headers.contains_key("accept"),
        "the manifest's accept header is replaced"
    );
    let closing = requests.last().unwrap();
    assert_eq!(closing.method, HttpMethod::Delete);
    assert_eq!(
        closing.headers.get("mcp-session-id").map(String::as_str),
        Some("session-1")
    );
}

#[tokio::test]
async fn sends_the_handshake_with_mcpkit_as_the_client() {
    let server = FakeMcpServer::new(200);

    let connection = connect_upstream(&http_spec(), &options(&server)).await.unwrap();
    connection.close().await;

    let bodies: Vec<String> = server
        .requests
        .borrow()
        .iter()
        .filter_map(|request| match &request.body {
            Some(RequestBody::Text(text)) => Some(text.clone()),
            _ => None,
        })
        .collect();
    assert_eq!(
        bodies,
        [
            r#"{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"mcpkit","version":"0.0.0"}}}"#,
            r#"{"jsonrpc":"2.0","method":"notifications/initialized"}"#,
        ]
    );
}

#[tokio::test]
async fn reports_a_401_as_unauthorized_and_other_failures_as_failed() {
    let refused = connect_upstream(&http_spec(), &options(&FakeMcpServer::new(401))).await;
    let broken = connect_upstream(&http_spec(), &options(&FakeMcpServer::new(500))).await;

    assert_eq!(
        refused.err(),
        Some(UpstreamError::Unauthorized(format!("{URL} answered 401")))
    );
    assert_eq!(broken.err(), Some(UpstreamError::Failed(format!("{URL} answered 500"))));
}
