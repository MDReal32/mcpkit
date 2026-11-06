mod support;

use serde_json::{Value, json};
use sha2::{Digest, Sha256};
use std::cell::RefCell;
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

/// A Streamable HTTP MCP server that only lets `Bearer second` in, recording the Authorization and JSON-RPC method of
/// every request (`DELETE` for the one that ends the session).
#[derive(Default)]
struct RemoteMcp {
    sent: RefCell<Vec<(String, String)>>,
}

impl RemoteMcp {
    fn methods(&self) -> Vec<String> {
        self.sent.borrow().iter().map(|(_, method)| method.clone()).collect()
    }

    fn answer(&self, request: &HttpRequest) -> HttpResponse {
        let authorization = request.headers.get("Authorization").cloned().unwrap_or_default();
        let message: Value = match &request.body {
            Some(RequestBody::Text(text)) => serde_json::from_str(text).unwrap(),
            _ => Value::Null,
        };
        let method = match request.method {
            HttpMethod::Delete => "DELETE".to_owned(),
            _ => message["method"].as_str().unwrap_or_default().to_owned(),
        };
        self.sent.borrow_mut().push((authorization.clone(), method.clone()));
        if authorization != "Bearer second" {
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
            response
                .headers
                .push(("mcp-session-id".to_owned(), "session-1".to_owned()));
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

/// A server over `registry`, whose manifests cache is `registry/manifests`, so a second one reads the first's cache.
fn remote_server(registry: &Path, http: Rc<RemoteMcp>, env: &[(&str, &str)]) -> McpServer<FolderFetcher> {
    let text = remote_manifest().to_string();
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
