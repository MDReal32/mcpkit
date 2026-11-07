mod support;

use serde_json::{Value, json};
use sha2::{Digest, Sha256};
use std::rc::Rc;
use std::time::Duration;
use support::{FolderFetcher, call_context, run_code};
use tempfile::TempDir;
use usemcpkit_core::LocalFuture;
use usemcpkit_http::{HttpClient, HttpError, HttpRequest, HttpResponse};
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::RegistryContext;
use usemcpkit_servers::catalog::RegistryCatalog;
use usemcpkit_servers::mcp::{EXECUTE_TOOL, McpServer, SEARCH_TOOL};
use usemcpkit_testing::json_response;

const REGISTRY_URL: &str = "https://registry.test";

/// An issue tracker that finds one issue for any query.
struct TrackerApi;

impl HttpClient for TrackerApi {
    fn send<'a>(
        &'a self,
        _request: &'a HttpRequest,
        _timeout: Duration,
    ) -> LocalFuture<'a, Result<HttpResponse, HttpError>> {
        let response = json_response(200, &json!({ "issues": [{ "key": "A-1", "id": "1" }] }));
        Box::pin(async move { Ok(response) })
    }
}

fn tracker_manifest() -> Value {
    json!({
        "name": "tracker",
        "category": "test",
        "version": "1.0.0",
        "description": "Issues",
        "baseUrl": "https://tracker.test",
        "auth": [{ "type": "bearer", "env": "TRACKER_TOKEN" }],
        "tools": [{
            "name": "issues:search",
            "description": "Search issues",
            "input": { "type": "object", "properties": { "jql": { "type": "string" } }, "required": ["jql"] },
            "request": { "method": "GET", "path": "/search", "query": ["jql"] },
            "response": { "root": "issues", "fields": { "key": "key" } },
        }],
    })
}

fn tracker_server(registry: &TempDir) -> McpServer<FolderFetcher> {
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
    let calls = call_context(
        &registry.path().join("home"),
        &[("TRACKER_TOKEN", "token")],
        Rc::new(TrackerApi),
    );
    McpServer::new(RegistryCatalog::new(servers, context, calls.clone()), calls)
}

async fn send(server: &McpServer<FolderFetcher>, message: Value) -> Value {
    server.handle_line(&message.to_string()).await.response.unwrap()
}

fn text_result(text: &str) -> Value {
    json!({ "content": [{ "type": "text", "text": text }] })
}

fn error_text(result: &Value) -> &str {
    assert_eq!(result["isError"], json!(true), "{result}");
    result["content"][0]["text"].as_str().unwrap()
}

#[tokio::test]
async fn lists_only_search_and_execute_with_the_servers_in_the_description() {
    let registry = TempDir::new().unwrap();
    let server = tracker_server(&registry);

    let listed = send(&server, json!({ "jsonrpc": "2.0", "id": 1, "method": "tools/list" })).await;

    let tools = listed["result"]["tools"].as_array().unwrap();
    let names: Vec<&str> = tools.iter().map(|tool| tool["name"].as_str().unwrap()).collect();
    assert_eq!(names, [SEARCH_TOOL, EXECUTE_TOOL]);
    assert!(
        tools[0]["description"]
            .as_str()
            .unwrap()
            .ends_with("Servers:\n- test:tracker: Issues")
    );
    assert_eq!(tools[0]["annotations"], json!({ "readOnlyHint": true }));
    assert_eq!(tools[1]["inputSchema"]["required"], json!(["code"]));
}

#[tokio::test]
async fn search_finds_tools_with_their_ids_and_schemas() {
    let registry = TempDir::new().unwrap();
    let server = tracker_server(&registry);

    let found = run_code(
        &server,
        SEARCH_TOOL,
        r#"async () => {
            const tools = await codemode.tools("test:tracker");
            return tools.map((tool) => ({ id: tool.id, required: tool.inputSchema.required }));
        };"#,
    )
    .await;

    assert_eq!(
        found,
        text_result(
            "[\n  {\n    \"id\": \"test:tracker:issues:search\",\n    \"required\": [\n      \"jql\"\n    ]\n  }\n]"
        )
    );
}

#[tokio::test]
async fn search_lists_every_tool_when_no_server_is_named() {
    let registry = TempDir::new().unwrap();
    let server = tracker_server(&registry);

    let found = run_code(
        &server,
        SEARCH_TOOL,
        r#"async () => (await codemode.tools()).map((tool) => tool.id)"#,
    )
    .await;
    let picked_group = run_code(
        &server,
        SEARCH_TOOL,
        r#"async () => codemode.tools(undefined, "issues")"#,
    )
    .await;

    assert_eq!(found, text_result("[\n  \"test:tracker:issues:search\"\n]"));
    assert!(
        error_text(&picked_group).starts_with("Error: codemode.tools needs a server to pick a group from\n"),
        "{picked_group}"
    );
}

#[tokio::test]
async fn search_cannot_call_tools() {
    let registry = TempDir::new().unwrap();
    let server = tracker_server(&registry);

    let refused = run_code(
        &server,
        SEARCH_TOOL,
        r#"async () => codemode.call("test:tracker:issues:search", { jql: "x" })"#,
    )
    .await;

    assert!(error_text(&refused).contains("codemode.call is only available in the execute tool"));
}

#[tokio::test]
async fn execute_calls_tools_and_returns_the_console_and_the_value() {
    let registry = TempDir::new().unwrap();
    let server = tracker_server(&registry);

    let result = run_code(
        &server,
        EXECUTE_TOOL,
        r#"async () => {
            const issues = await codemode.call("test:tracker:issues:search", { jql: "x" });
            console.log("found", issues.length, { first: issues[0].key });
            return issues[0].key;
        }"#,
    )
    .await;

    assert_eq!(
        result,
        text_result("--- console ---\nfound 1 {\"first\":\"A-1\"}\n\n--- result ---\n\"A-1\"")
    );
}

#[tokio::test]
async fn errors_come_back_as_error_results() {
    let registry = TempDir::new().unwrap();
    let server = tracker_server(&registry);

    let thrown = run_code(&server, EXECUTE_TOOL, r#"async () => { throw new Error("boom"); }"#).await;
    let unknown = run_code(
        &server,
        EXECUTE_TOOL,
        r#"async () => codemode.call("test:tracker:nothing", {})"#,
    )
    .await;
    let not_a_function = run_code(&server, EXECUTE_TOOL, "42").await;
    let broken = run_code(&server, EXECUTE_TOOL, "async () => {").await;

    assert!(error_text(&thrown).contains("boom"));
    assert!(error_text(&unknown).contains("test:tracker:nothing"));
    assert!(error_text(&not_a_function).contains("async arrow function"));
    assert!(error_text(&broken).contains("unexpected token"));
}

#[tokio::test]
async fn a_function_that_returns_nothing_says_so() {
    let registry = TempDir::new().unwrap();
    let server = tracker_server(&registry);

    assert_eq!(
        run_code(&server, EXECUTE_TOOL, "async () => {}").await,
        text_result("undefined")
    );
}

#[tokio::test]
async fn other_tool_names_are_protocol_errors() {
    let registry = TempDir::new().unwrap();
    let server = tracker_server(&registry);

    let message = json!({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
        "params": { "name": "test_tracker", "arguments": {} },
    });
    let response = send(&server, message).await;

    assert_eq!(response["error"]["code"], json!(-32602));
}
