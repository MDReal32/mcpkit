mod support;

use serde_json::{Value, json};
use std::cell::Cell;
use std::rc::Rc;
use support::{call_context, run_code};
use tempfile::TempDir;
use usemcpkit_http::HttpResponse;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::{Fetch, RegistryContext, RegistryError};
use usemcpkit_servers::catalog::RegistryCatalog;
use usemcpkit_servers::mcp::{McpServer, SEARCH_TOOL};
use usemcpkit_testing::FixedClient;

/// A registry that is never reachable, counting how often it was asked.
struct OfflineFetcher {
    calls: Rc<Cell<usize>>,
}

impl Fetch for OfflineFetcher {
    async fn fetch_text(&self, url: &str) -> Result<String, RegistryError> {
        self.calls.set(self.calls.get() + 1);
        Err(RegistryError::failed(format!("GET {url} failed: offline")))
    }
}

fn offline_server(calls: &Rc<Cell<usize>>, cache: &TempDir) -> McpServer<OfflineFetcher> {
    let context = RegistryContext::new(
        cache.path().join("manifests"),
        "https://registry.invalid".into(),
        OfflineFetcher {
            calls: Rc::clone(calls),
        },
    );
    let servers = vec![RegistryServer {
        id: "git:github".into(),
        version: "1.0.0".into(),
        url: "git/github.json".into(),
        sha256: "0".repeat(64),
        description: None,
        upstream: false,
    }];
    let calls = call_context(cache.path(), &[], Rc::new(FixedClient::new(HttpResponse::default())));
    McpServer::new(RegistryCatalog::new(servers, context, calls.clone()), calls)
}

async fn answer(server: &McpServer<OfflineFetcher>, message: Value) -> Option<Value> {
    server.handle_line(&message.to_string()).await.response
}

#[tokio::test]
async fn answers_protocol_mistakes_with_json_rpc_errors() {
    let cache = TempDir::new().unwrap();
    let server = offline_server(&Rc::new(Cell::new(0)), &cache);

    assert_eq!(
        answer(&server, json!({ "jsonrpc": "2.0", "id": 1, "method": "nope" })).await,
        Some(json!({ "jsonrpc": "2.0", "id": 1, "error": { "code": -32601, "message": "method not found: nope" } }))
    );
    assert_eq!(
        answer(&server, json!({ "id": "a", "method": "tools/call" })).await,
        Some(json!({ "jsonrpc": "2.0", "id": "a", "error": {
            "code": -32602,
            "message": "unknown tool: undefined; the tools are search and execute",
        } }))
    );
    assert_eq!(answer(&server, json!({ "method": "nope" })).await, None);
    assert_eq!(server.handle_line("  ").await.response, None);
    let parse_error = server.handle_line("{").await.response.unwrap();
    assert_eq!(parse_error["id"], json!(null));
    assert_eq!(parse_error["error"]["code"], json!(-32700));
    assert_eq!(
        answer(&server, json!({ "id": null, "method": "ping" })).await,
        Some(json!({ "jsonrpc": "2.0", "id": null, "result": {} }))
    );
}

#[tokio::test]
async fn reports_a_server_that_cannot_load_and_tries_again_on_the_next_search() {
    let calls = Rc::new(Cell::new(0));
    let cache = TempDir::new().unwrap();
    let server = offline_server(&calls, &cache);
    let code = r#"async () => codemode.groups("git:github")"#;

    let first = run_code(&server, SEARCH_TOOL, code).await;
    let tried = calls.get();
    let second = run_code(&server, SEARCH_TOOL, code).await;

    assert_eq!(first["isError"], json!(true), "{first}");
    let text = first["content"][0]["text"].as_str().unwrap();
    assert!(
        text.contains("GET https://registry.invalid/git/github.json failed: offline"),
        "{text}"
    );
    assert_eq!(second["isError"], json!(true), "{second}");
    assert!(calls.get() > tried, "the second search did not try the registry again");
}
