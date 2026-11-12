mod support;

use serde_json::{Value, json};
use sha2::{Digest, Sha256};
use std::cell::{Cell, RefCell};
use std::path::{Path, PathBuf};
use std::rc::Rc;
use std::time::Duration;
use support::{call_context, run_code};
use tempfile::TempDir;
use tokio::task::LocalSet;
use usemcpkit_core::LocalFuture;
use usemcpkit_http::{HttpClient, HttpError, HttpRequest, HttpResponse, RequestBody};
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_manifest::tool::HttpMethod;
use usemcpkit_registry::{Fetch, RegistryContext, RegistryError};
use usemcpkit_servers::catalog::RegistryCatalog;
use usemcpkit_servers::mcp::{EXECUTE_TOOL, McpServer, SEARCH_TOOL};
use usemcpkit_testing::json_response;

const REGISTRY_URL: &str = "https://registry.test";

const UPSTREAM_URL: &str = "https://mcp.test/mcp";

const TOKENS: &[(&str, &str)] = &[("FIRST_TOKEN", "revoked"), ("SECOND_TOKEN", "second")];

struct FolderFetcher {
    root: PathBuf,
}

impl Fetch for FolderFetcher {
    async fn fetch_text(&self, url: &str) -> Result<String, RegistryError> {
        let path = url
            .strip_prefix(&format!("{REGISTRY_URL}/"))
            .ok_or_else(|| RegistryError::failed(format!("GET {url} failed: 404")))?;
        std::fs::read_to_string(self.root.join(path))
            .map_err(|error| RegistryError::failed(format!("GET {url}: {error}")))
    }
}

/// A Streamable HTTP MCP server that lets `Bearer second` and the `also_allowed` headers in, recording the
/// Authorization and JSON-RPC method of every request (`DELETE` for the one that ends the session). Each `initialize`
/// starts a new session; `refuses_calls` answers every `tools/call` with 401 and `end_session` makes the latest
/// session answer 404.
#[derive(Default)]
struct RemoteMcp {
    sent: RefCell<Vec<(String, String)>>,
    also_allowed: RefCell<Vec<String>>,
    refuses_calls: Cell<bool>,
    sessions: Cell<u32>,
    ended_session: RefCell<Option<String>>,
}

impl RemoteMcp {
    fn methods(&self) -> Vec<String> {
        self.sent.borrow().iter().map(|(_, method)| method.clone()).collect()
    }

    fn end_session(&self) {
        self.ended_session
            .replace(Some(format!("session-{}", self.sessions.get())));
    }

    fn answer(&self, request: &HttpRequest) -> HttpResponse {
        let authorization = request.headers.get("Authorization").cloned().unwrap_or_default();
        let session = request.headers.get("mcp-session-id").cloned();
        let message: Value = match &request.body {
            Some(RequestBody::Text(text)) => serde_json::from_str(text).unwrap(),
            _ => Value::Null,
        };
        let method = match request.method {
            HttpMethod::Delete => "DELETE".to_owned(),
            _ => message["method"].as_str().unwrap_or_default().to_owned(),
        };
        self.sent.borrow_mut().push((authorization.clone(), method.clone()));
        if session.is_some() && *self.ended_session.borrow() == session {
            return json_response(404, &json!({ "error": "session not found" }));
        }
        let allowed = authorization == "Bearer second" || self.also_allowed.borrow().contains(&authorization);
        if !allowed || (self.refuses_calls.get() && method == "tools/call") {
            return json_response(401, &json!({ "error": "invalid token" }));
        }
        let Some(id) = message.get("id").cloned() else {
            return HttpResponse {
                status: 202,
                ..HttpResponse::default()
            };
        };
        let result = match method.as_str() {
            "initialize" => json!({ "protocolVersion": "2025-06-18", "capabilities": {} }),
            "tools/list" => json!({ "tools": [
                { "name": "list_items", "description": "Lists items", "inputSchema": { "type": "object", "properties": { "q": { "type": "string" } } } },
                { "name": "get_item", "description": "Gets an item" },
                { "name": "docs_search" },
            ] }),
            _ => {
                json!({ "content": [{ "type": "text", "text": format!("ran {}", message["params"]["name"].as_str().unwrap()) }] })
            }
        };
        let mut response = json_response(200, &json!({ "jsonrpc": "2.0", "id": id, "result": result }));
        if method == "initialize" {
            self.sessions.set(self.sessions.get() + 1);
            response
                .headers
                .push(("mcp-session-id".to_owned(), format!("session-{}", self.sessions.get())));
        }
        response
    }
}

impl HttpClient for RemoteMcp {
    fn send<'a>(
        &'a self,
        request: &'a HttpRequest,
        _timeout: Duration,
    ) -> LocalFuture<'a, Result<HttpResponse, HttpError>> {
        let response = self.answer(request);
        Box::pin(async move { Ok(response) })
    }
}

fn remote_manifest() -> Value {
    json!({
        "name": "remote",
        "category": "test",
        "version": "1.0.0",
        "description": "A remote MCP server",
        "baseUrl": "https://mcp.test",
        "auth": [{ "type": "bearer", "env": "FIRST_TOKEN" }, { "type": "bearer", "env": "SECOND_TOKEN" }],
        "upstream": {
            "type": "http",
            "url": UPSTREAM_URL,
            "naming": [
                { "match": "^(list|get)_items?$", "name": "store:items:$1" },
                { "match": "^docs_(.+)$", "name": "docs:docs:$1" },
            ],
        },
        "tools": [],
    })
}

/// The remote server with a tool of its own, signed in with `OWN_TOKEN`, while its upstream keeps the bearer tokens.
fn combined_manifest() -> Value {
    let mut manifest = remote_manifest();
    manifest["auth"] = json!([{ "type": "bearer", "env": "OWN_TOKEN" }]);
    manifest["upstream"]["auth"] = json!([{ "type": "bearer", "env": "SECOND_TOKEN" }]);
    manifest["tools"] = json!([{
        "name": "store:own:ping",
        "description": "A tool of the manifest itself",
        "input": { "type": "object", "properties": {} },
        "request": { "method": "GET", "path": "/ping" },
    }]);
    manifest
}

fn remote_server(registry: &Path, http: Rc<RemoteMcp>, env: &[(&str, &str)]) -> McpServer<FolderFetcher> {
    server_for(registry, http, env, &remote_manifest())
}

/// A server over `registry`, whose manifests cache is `registry/manifests`, so a second one reads the first's cache.
fn server_for(
    registry: &Path,
    http: Rc<RemoteMcp>,
    env: &[(&str, &str)],
    manifest: &Value,
) -> McpServer<FolderFetcher> {
    let text = manifest.to_string();
    std::fs::create_dir_all(registry.join("registry/test")).unwrap();
    std::fs::write(registry.join("registry/test/remote.json"), &text).unwrap();
    let servers = vec![RegistryServer {
        id: "test:remote".into(),
        version: "1.0.0".into(),
        url: "test/remote.json".into(),
        sha256: format!("{:x}", Sha256::digest(text.as_bytes())),
        description: Some("A remote MCP server".into()),
        upstream: true,
    }];
    let context = RegistryContext::new(
        registry.join("manifests"),
        REGISTRY_URL.into(),
        FolderFetcher {
            root: registry.join("registry"),
        },
    );
    let calls = call_context(&registry.join("home"), env, http);
    McpServer::new(RegistryCatalog::new(servers, context, calls.clone()), calls)
}

const GROUPS: &str = r#"async () => codemode.groups("test:remote")"#;

const LIST_ITEMS: &str = r#"async () => codemode.call("test:remote:store:items:list")"#;

fn to_sent(pairs: &[(&str, &str)]) -> Vec<(String, String)> {
    pairs
        .iter()
        .map(|(authorization, method)| ((*authorization).to_owned(), (*method).to_owned()))
        .collect()
}

/// The JSON a successful `search` or `execute` returned.
async fn run_json(server: &McpServer<FolderFetcher>, tool: &str, code: &str) -> Value {
    let result = run_code(server, tool, code).await;
    assert_eq!(result.get("isError"), None, "{result}");
    serde_json::from_str(result["content"][0]["text"].as_str().unwrap()).unwrap()
}

fn cache_file(registry: &Path) -> PathBuf {
    registry.join("manifests/upstream/test/remote.json")
}

#[tokio::test]
async fn discovers_the_tools_on_first_use_groups_them_and_calls_the_upstream() {
    let registry = TempDir::new().unwrap();
    let http = Rc::new(RemoteMcp::default());
    let server = remote_server(registry.path(), Rc::clone(&http), TOKENS);
    assert!(
        http.methods().is_empty(),
        "nothing is started before the code asks for it"
    );

    let groups = run_json(&server, SEARCH_TOOL, GROUPS).await;
    let ids = run_json(
        &server,
        SEARCH_TOOL,
        r#"async () => (await codemode.tools("test:remote", "store")).map((tool) => tool.id)"#,
    )
    .await;
    let results = run_json(
        &server,
        EXECUTE_TOOL,
        r#"async () => [
            await codemode.call("test:remote:store:items:list", { q: "x" }),
            await codemode.call("test:remote:store:items:list"),
        ]"#,
    )
    .await;
    server.close().await;

    assert_eq!(groups, json!(["store", "docs"]));
    assert_eq!(
        ids,
        json!(["test:remote:store:items:list", "test:remote:store:items:get"])
    );
    assert_eq!(results, json!(["ran list_items", "ran list_items"]));
    assert_eq!(
        *http.sent.borrow(),
        [
            ("Bearer revoked", "initialize"),
            ("Bearer second", "initialize"),
            ("Bearer second", "notifications/initialized"),
            ("Bearer second", "tools/list"),
            ("Bearer second", "DELETE"),
            ("Bearer second", "initialize"),
            ("Bearer second", "notifications/initialized"),
            ("Bearer second", "tools/call"),
            ("Bearer second", "tools/call"),
            ("Bearer second", "DELETE"),
        ]
        .map(|(authorization, method)| (authorization.to_owned(), method.to_owned()))
    );
}

#[tokio::test]
async fn lists_an_upstream_among_every_tool_only_once_it_was_started() {
    let registry = TempDir::new().unwrap();
    let http = Rc::new(RemoteMcp::default());
    let server = remote_server(registry.path(), Rc::clone(&http), TOKENS);
    let every_tool = r#"async () => (await codemode.tools()).map((tool) => tool.id)"#;

    let before = run_json(&server, SEARCH_TOOL, every_tool).await;
    let started_nothing = http.methods().is_empty();
    run_json(&server, SEARCH_TOOL, GROUPS).await;
    let after = run_json(&server, SEARCH_TOOL, every_tool).await;
    server.close().await;

    assert_eq!(before, json!([]));
    assert!(started_nothing, "listing every tool never starts an upstream");
    assert_eq!(
        after,
        json!([
            "test:remote:store:items:list",
            "test:remote:store:items:get",
            "test:remote:docs:docs:search",
        ])
    );
}

#[tokio::test]
async fn caches_the_tools_in_the_typescript_cli_format_and_reads_them_back_without_the_upstream() {
    let registry = TempDir::new().unwrap();
    let first = remote_server(registry.path(), Rc::new(RemoteMcp::default()), TOKENS);
    run_json(&first, SEARCH_TOOL, GROUPS).await;
    let http = Rc::new(RemoteMcp::default());
    let second = remote_server(registry.path(), Rc::clone(&http), TOKENS);

    let groups = run_json(&second, SEARCH_TOOL, GROUPS).await;

    let text = std::fs::read_to_string(cache_file(registry.path())).unwrap();
    assert!(text.starts_with("{\n  \"discoveredAt\": \""), "{text}");
    assert!(text.ends_with("}\n"), "{text}");
    let cache: Value = serde_json::from_str(&text).unwrap();
    assert!(cache["discoveredAt"].as_str().unwrap().ends_with('Z'));
    let keys: Vec<Vec<&str>> = cache["tools"]
        .as_array()
        .unwrap()
        .iter()
        .map(|tool| tool.as_object().unwrap().keys().map(String::as_str).collect())
        .collect();
    assert_eq!(
        keys,
        [
            vec!["name", "upstreamName", "description", "inputSchema"],
            vec!["name", "upstreamName", "description"],
            vec!["name", "upstreamName"],
        ]
    );
    assert_eq!(cache["tools"][0]["name"], "store:items:list");
    assert_eq!(cache["tools"][2]["upstreamName"], "docs_search");
    assert!(http.methods().is_empty(), "a cached list is not asked for again");
    assert_eq!(groups, json!(["store", "docs"]));
}

#[tokio::test]
async fn names_cached_tools_by_the_current_rules_and_refreshes_a_day_old_list_in_the_background() {
    LocalSet::new()
        .run_until(async {
            let registry = TempDir::new().unwrap();
            let stale = json!({
                "discoveredAt": "2020-01-01T00:00:00.000Z",
                "tools": [{ "name": "tools:old_name", "upstreamName": "get_item" }],
            });
            std::fs::create_dir_all(cache_file(registry.path()).parent().unwrap()).unwrap();
            std::fs::write(cache_file(registry.path()), stale.to_string()).unwrap();
            let http = Rc::new(RemoteMcp::default());
            let server = remote_server(registry.path(), Rc::clone(&http), TOKENS);

            let ids = run_json(
                &server,
                SEARCH_TOOL,
                r#"async () => (await codemode.tools("test:remote")).map((tool) => tool.id)"#,
            )
            .await;
            let read_cache = || std::fs::read_to_string(cache_file(registry.path())).unwrap();
            for _ in 0..200 {
                if !read_cache().contains("2020-01-01") {
                    break;
                }
                tokio::time::sleep(Duration::from_millis(10)).await;
            }

            assert_eq!(
                ids,
                json!(["test:remote:store:items:get"]),
                "the cached tool takes its name from the rules"
            );
            assert!(
                http.methods().contains(&"tools/list".to_owned()),
                "{:?}",
                http.methods()
            );
            let refreshed: Value = serde_json::from_str(&read_cache()).unwrap();
            assert_ne!(refreshed["discoveredAt"], "2020-01-01T00:00:00.000Z");
            assert_eq!(refreshed["tools"].as_array().unwrap().len(), 3);
        })
        .await;
}

#[tokio::test]
async fn reopens_a_kept_connection_whose_token_was_revoked_and_sends_the_call_once_more() {
    let registry = TempDir::new().unwrap();
    let http = Rc::new(RemoteMcp::default());
    http.also_allowed.borrow_mut().push("Bearer revoked".to_owned());
    let server = remote_server(registry.path(), Rc::clone(&http), TOKENS);
    run_json(&server, SEARCH_TOOL, GROUPS).await;
    run_json(&server, EXECUTE_TOOL, LIST_ITEMS).await;
    http.also_allowed.borrow_mut().clear();
    http.sent.borrow_mut().clear();

    let result = run_json(&server, EXECUTE_TOOL, LIST_ITEMS).await;
    server.close().await;

    assert_eq!(result, json!("ran list_items"));
    assert_eq!(
        *http.sent.borrow(),
        to_sent(&[
            ("Bearer revoked", "tools/call"),
            ("Bearer revoked", "DELETE"),
            ("Bearer revoked", "initialize"),
            ("Bearer second", "initialize"),
            ("Bearer second", "notifications/initialized"),
            ("Bearer second", "tools/call"),
            ("Bearer second", "DELETE"),
        ])
    );
}

#[tokio::test]
async fn starts_a_new_session_when_the_upstream_ended_the_kept_one() {
    let registry = TempDir::new().unwrap();
    let http = Rc::new(RemoteMcp::default());
    let server = remote_server(registry.path(), Rc::clone(&http), TOKENS);
    run_json(&server, SEARCH_TOOL, GROUPS).await;
    run_json(&server, EXECUTE_TOOL, LIST_ITEMS).await;
    http.end_session();
    http.sent.borrow_mut().clear();

    let result = run_json(&server, EXECUTE_TOOL, LIST_ITEMS).await;
    server.close().await;

    assert_eq!(result, json!("ran list_items"));
    assert_eq!(
        *http.sent.borrow(),
        to_sent(&[
            ("Bearer second", "tools/call"),
            ("Bearer second", "DELETE"),
            ("Bearer second", "initialize"),
            ("Bearer second", "notifications/initialized"),
            ("Bearer second", "tools/call"),
            ("Bearer second", "DELETE"),
        ])
    );
}

#[tokio::test]
async fn gives_up_without_a_loop_when_every_new_connection_is_turned_away_too() {
    let registry = TempDir::new().unwrap();
    let http = Rc::new(RemoteMcp::default());
    let server = remote_server(registry.path(), Rc::clone(&http), TOKENS);
    run_json(&server, SEARCH_TOOL, GROUPS).await;
    run_json(&server, EXECUTE_TOOL, LIST_ITEMS).await;
    http.refuses_calls.set(true);
    http.sent.borrow_mut().clear();

    let result = run_code(&server, EXECUTE_TOOL, LIST_ITEMS).await;
    server.close().await;

    let message = result["content"][0]["text"].as_str().unwrap_or_default().to_owned();
    assert_eq!(result["isError"], true, "{result}");
    assert!(message.contains("remote: no auth option worked"), "{message}");
    let calls = http.methods().iter().filter(|method| *method == "tools/call").count();
    assert_eq!(calls, 2, "the kept connection's call and one on the new connection");
}

#[tokio::test]
async fn answers_an_upstream_nobody_can_reach_with_an_error_result() {
    let registry = TempDir::new().unwrap();
    let server = remote_server(
        registry.path(),
        Rc::new(RemoteMcp::default()),
        &[("FIRST_TOKEN", "revoked")],
    );

    let result = run_code(&server, SEARCH_TOOL, GROUPS).await;

    let message = result["content"][0]["text"].as_str().unwrap_or_default().to_owned();
    assert_eq!(result["isError"], true, "{result}");
    assert!(
        message.contains("test:remote is unavailable: remote: no auth option worked\n  auth[0] "),
        "{message}"
    );
}

const COMBINED_TOKENS: &[(&str, &str)] = &[("OWN_TOKEN", "own"), ("SECOND_TOKEN", "second")];

fn combined_server(registry: &Path, http: Rc<RemoteMcp>, env: &[(&str, &str)]) -> McpServer<FolderFetcher> {
    http.also_allowed.borrow_mut().push("Bearer own".to_owned());
    server_for(registry, http, env, &combined_manifest())
}

const OWN_PING: &str = r#"async () => codemode.call("test:remote:store:own:ping")"#;

const SERVER_TOOLS: &str = r#"async () => (await codemode.tools("test:remote")).map((tool) => tool.id)"#;

#[tokio::test]
async fn runs_a_tool_of_the_manifest_without_starting_its_upstream() {
    let registry = TempDir::new().unwrap();
    let http = Rc::new(RemoteMcp::default());
    let server = combined_server(registry.path(), Rc::clone(&http), COMBINED_TOKENS);

    run_json(&server, EXECUTE_TOOL, OWN_PING).await;
    server.close().await;

    assert_eq!(*http.sent.borrow(), to_sent(&[("Bearer own", "")]));
}

#[tokio::test]
async fn lists_the_own_tools_before_the_upstream_started_and_both_after() {
    let registry = TempDir::new().unwrap();
    let http = Rc::new(RemoteMcp::default());
    let server = combined_server(registry.path(), Rc::clone(&http), COMBINED_TOKENS);
    let every_tool = r#"async () => (await codemode.tools()).map((tool) => tool.id)"#;

    let before = run_json(&server, SEARCH_TOOL, every_tool).await;
    let started_nothing = http.methods().is_empty();
    let server_tools = run_json(&server, SEARCH_TOOL, SERVER_TOOLS).await;
    let after = run_json(&server, SEARCH_TOOL, every_tool).await;
    server.close().await;

    assert_eq!(before, json!(["test:remote:store:own:ping"]));
    assert!(started_nothing, "listing every tool never starts an upstream");
    let both = json!([
        "test:remote:store:own:ping",
        "test:remote:store:items:list",
        "test:remote:store:items:get",
        "test:remote:docs:docs:search",
    ]);
    assert_eq!(server_tools, both);
    assert_eq!(after, both);
}

#[tokio::test]
async fn calls_the_upstream_tools_with_the_auth_of_the_upstream() {
    let registry = TempDir::new().unwrap();
    let http = Rc::new(RemoteMcp::default());
    let server = combined_server(registry.path(), Rc::clone(&http), COMBINED_TOKENS);

    let results = run_json(
        &server,
        EXECUTE_TOOL,
        r#"async () => [await codemode.call("test:remote:store:items:list"), await codemode.call("test:remote:store:own:ping")]"#,
    )
    .await;
    server.close().await;

    assert_eq!(results[0], json!("ran list_items"));
    let signed: Vec<String> = http
        .sent
        .borrow()
        .iter()
        .map(|(authorization, method)| format!("{authorization}:{method}"))
        .collect();
    assert_eq!(
        signed,
        [
            "Bearer second:initialize",
            "Bearer second:notifications/initialized",
            "Bearer second:tools/list",
            "Bearer second:DELETE",
            "Bearer second:initialize",
            "Bearer second:notifications/initialized",
            "Bearer second:tools/call",
            "Bearer own:",
            "Bearer second:DELETE",
        ]
    );
}

#[tokio::test]
async fn keeps_the_own_tools_and_says_why_when_the_upstream_cannot_start() {
    let registry = TempDir::new().unwrap();
    let http = Rc::new(RemoteMcp::default());
    let server = combined_server(registry.path(), Rc::clone(&http), &[("OWN_TOKEN", "own")]);

    let result = run_code(&server, SEARCH_TOOL, SERVER_TOOLS).await;
    server.close().await;

    assert_eq!(result.get("isError"), None, "{result}");
    let text = result["content"][0]["text"].as_str().unwrap();
    assert!(text.contains("warning: test:remote is unavailable"), "{text}");
    assert!(text.contains("test:remote:store:own:ping"), "{text}");
}

#[tokio::test]
async fn hides_an_upstream_tool_that_shares_its_name_with_an_own_tool() {
    let registry = TempDir::new().unwrap();
    let http = Rc::new(RemoteMcp::default());
    let mut manifest = combined_manifest();
    manifest["tools"][0]["name"] = json!("store:items:list");
    http.also_allowed.borrow_mut().push("Bearer own".to_owned());
    let server = server_for(registry.path(), Rc::clone(&http), COMBINED_TOKENS, &manifest);

    let result = run_code(&server, SEARCH_TOOL, SERVER_TOOLS).await;
    server.close().await;

    let text = result["content"][0]["text"].as_str().unwrap();
    assert!(
        text.contains("warning: test:remote: the upstream tools store:items:list share a name"),
        "{text}"
    );
    assert_eq!(text.matches("test:remote:store:items:list").count(), 1, "{text}");
}
