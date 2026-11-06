mod support;

use serde_json::{Value, json};
use sha2::{Digest, Sha256};
use std::cell::RefCell;
use std::rc::Rc;
use std::time::Duration;
use support::{FolderFetcher, call_context, run_code};
use tempfile::TempDir;
use usemcpkit_core::LocalFuture;
use usemcpkit_http::{HttpClient, HttpError, HttpRequest, HttpResponse};
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::RegistryContext;
use usemcpkit_servers::catalog::RegistryCatalog;
use usemcpkit_servers::mcp::{EXECUTE_TOOL, McpServer};
use usemcpkit_testing::json_response;

const REGISTRY_URL: &str = "https://registry.test";

/// An issue tracker that only knows `Bearer second`, recording the URL and Authorization of every request.
#[derive(Default)]
struct TrackerApi {
    sent: RefCell<Vec<(String, String)>>,
}

impl HttpClient for TrackerApi {
    fn send<'a>(
        &'a self,
        request: &'a HttpRequest,
        _timeout: Duration,
    ) -> LocalFuture<'a, Result<HttpResponse, HttpError>> {
        let authorization = request.headers.get("Authorization").cloned().unwrap_or_default();
        let response = match authorization.as_str() {
            "Bearer second" => json_response(200, &json!({ "issues": [{ "key": "A-1", "id": "1" }] })),
            _ => json_response(401, &json!({ "message": "Bad credentials" })),
        };
        self.sent.borrow_mut().push((request.url.clone(), authorization));
        Box::pin(async move { Ok(response) })
    }
}

fn tracker_manifest() -> Value {
    json!({
        "name": "tracker",
        "category": "test",
        "version": "1.0.0",
        "description": "Issues",
        "baseUrl": "https://{domain}",
        "domain": { "env": "TRACKER_HOST" },
        "editions": { "cloud": { "label": "Cloud", "hosts": [".atlassian.net"] } },
        "auth": [{ "type": "bearer", "env": "FIRST_TOKEN" }, { "type": "bearer", "env": "SECOND_TOKEN" }],
        "tools": [{
            "name": "search",
            "description": "Search issues",
            "input": { "type": "object", "properties": { "jql": { "type": "string" } }, "required": ["jql"] },
            "request": { "method": "GET", "path": "/rest/api/2/search", "query": ["jql"] },
            "response": { "root": "issues", "fields": { "key": "key" } },
            "editions": {
                "cloud": { "request": { "method": "GET", "path": "/rest/api/2/search/jql", "query": ["jql"] } },
            },
        }],
    })
}

fn tracker_server(registry: &TempDir, http: Rc<TrackerApi>) -> McpServer<FolderFetcher> {
    let text = tracker_manifest().to_string();
    std::fs::create_dir_all(registry.path().join("registry/test")).unwrap();
    std::fs::write(registry.path().join("registry/test/tracker.json"), &text).unwrap();
    let servers = vec![RegistryServer {
        id: "test:tracker".into(),
        version: "1.0.0".into(),
        url: "test/tracker.json".into(),
        sha256: format!("{:x}", Sha256::digest(text.as_bytes())),
        description: Some("Issues".into()),
        upstream: false,
    }];
    let context = RegistryContext::new(
        registry.path().join("manifests"),
        REGISTRY_URL.into(),
        FolderFetcher::new(registry.path().join("registry"), REGISTRY_URL),
    );
    let env = [
        ("TRACKER_HOST", "acme.atlassian.net"),
        ("FIRST_TOKEN", "revoked"),
        ("SECOND_TOKEN", "second"),
    ];
    let calls = call_context(&registry.path().join("home"), &env, http);
    McpServer::new(RegistryCatalog::new(servers, context, calls.clone()), calls)
}

#[tokio::test]
async fn runs_a_tool_on_its_edition_and_keeps_the_auth_that_worked() {
    let registry = TempDir::new().unwrap();
    let http = Rc::new(TrackerApi::default());
    let server = tracker_server(&registry, Rc::clone(&http));

    let first = run_code(
        &server,
        EXECUTE_TOOL,
        r#"async () => codemode.call("test:tracker:search", { jql: "x" })"#,
    )
    .await;
    let second = run_code(
        &server,
        EXECUTE_TOOL,
        r#"async () => codemode.call("test:tracker:search", { jql: "x" })"#,
    )
    .await;

    let found = json!({ "content": [{ "type": "text", "text": "[\n  {\n    \"key\": \"A-1\"\n  }\n]" }] });
    assert_eq!(first, found);
    assert_eq!(second, found);
    let url = "https://acme.atlassian.net/rest/api/2/search/jql?jql=x";
    assert_eq!(
        *http.sent.borrow(),
        [
            (url.to_owned(), "Bearer revoked".to_owned()),
            (url.to_owned(), "Bearer second".to_owned()),
            (url.to_owned(), "Bearer second".to_owned()),
        ]
    );
}

#[tokio::test]
async fn answers_a_failing_tool_with_an_error_result() {
    let registry = TempDir::new().unwrap();
    let server = tracker_server(&registry, Rc::new(TrackerApi::default()));

    let result = run_code(
        &server,
        EXECUTE_TOOL,
        r#"async () => codemode.call("test:tracker:search", {})"#,
    )
    .await;

    assert_eq!(result["isError"], json!(true), "{result}");
    let text = result["content"][0]["text"].as_str().unwrap();
    assert!(text.contains("missing required argument(s): jql"), "{text}");
}
