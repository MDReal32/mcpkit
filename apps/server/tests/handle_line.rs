mod support;

use serde_json::{Value, json};
use std::cell::Cell;
use std::rc::Rc;
use support::call_context;
use tempfile::TempDir;
use usemcpkit_http::HttpResponse;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::{Fetch, RegistryContext, RegistryError};
use usemcpkit_servers::catalog::RegistryCatalog;
use usemcpkit_servers::mcp::{McpServer, ToolLoading};
use usemcpkit_testing::FixedClient;
use usemcpkit_wire_log::{WireLog, WireLogRole};

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
    offline_server_loading(calls, cache, ToolLoading::Partial)
}

fn offline_server_loading(calls: &Rc<Cell<usize>>, cache: &TempDir, loading: ToolLoading) -> McpServer<OfflineFetcher> {
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
    McpServer::new(
        RegistryCatalog::new(servers, context, calls.clone()),
        Rc::new(WireLog::disabled(WireLogRole::Server)),
        calls,
        loading,
    )
}

async fn answer(server: &McpServer<OfflineFetcher>, message: Value) -> Option<Value> {
    server.handle_line(&message.to_string()).await.response
}

#[tokio::test]
async fn answers_protocol_mistakes_with_the_errors_the_typescript_server_sends() {
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
            "message": "unknown tool: undefined; open its section first, the tool list shows the sections",
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
async fn reports_a_section_that_cannot_open_and_tries_again_on_the_next_call() {
    let calls = Rc::new(Cell::new(0));
    let cache = TempDir::new().unwrap();
    let server = offline_server(&calls, &cache);
    let call = json!({ "id": 2, "method": "tools/call", "params": { "name": "git_github" } });

    let first = server.handle_line(&call.to_string()).await;
    let second = answer(&server, call).await.unwrap();

    let result = &first.response.unwrap()["result"];
    assert_eq!(result["isError"], json!(true));
    assert_eq!(
        result["content"][0]["text"],
        json!("could not open git_github: GET https://registry.invalid/git/github.json failed: offline")
    );
    assert!(!first.tools_changed);
    assert_eq!(second["result"]["isError"], json!(true));
    assert!(calls.get() >= 2, "the second call did not try the registry again");
}

#[tokio::test]
async fn full_loading_keeps_a_server_it_cannot_load_as_a_section() {
    let calls = Rc::new(Cell::new(0));
    let cache = TempDir::new().unwrap();
    let server = offline_server_loading(&calls, &cache, ToolLoading::Full);

    let listed = answer(&server, json!({ "id": 1, "method": "tools/list" }))
        .await
        .unwrap();
    let tried = calls.get();
    let opened = answer(
        &server,
        json!({ "id": 2, "method": "tools/call", "params": { "name": "git_github" } }),
    )
    .await
    .unwrap();

    let names: Vec<&Value> = listed["result"]["tools"]
        .as_array()
        .unwrap()
        .iter()
        .map(|tool| &tool["name"])
        .collect();
    assert_eq!(names, vec![&json!("git_github")]);
    assert!(tried >= 1, "the first listing did not try to load the server");
    assert_eq!(opened["result"]["isError"], json!(true));
    assert!(
        calls.get() > tried,
        "opening the section did not try the registry again"
    );
}
