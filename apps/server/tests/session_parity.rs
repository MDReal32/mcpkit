mod support;

use mcpkit_http::HttpResponse;
use mcpkit_registry::{DEFAULT_REGISTRY_URL, Fetch, RegistryContext, RegistryError};
use mcpkit_server::catalog::load_catalog;
use mcpkit_server::mcp::McpServer;
use mcpkit_testing::FixedClient;
use mcpkit_wire_log::{WireLog, WireLogRole};
use serde_json::{Map, Value, json};
use sha2::{Digest, Sha256};
use std::collections::{BTreeMap, HashSet};
use std::path::{Path, PathBuf};
use std::rc::Rc;
use support::{call_context, registry_root};
use tempfile::TempDir;

const SECTION_MARKER: &str = "SECTION of mcpkit";

const PARSE_ERROR: i64 = -32700;

/// Serves the built registry as if it were published.
struct FolderFetcher {
    root: PathBuf,
}

impl Fetch for FolderFetcher {
    async fn fetch_text(&self, url: &str) -> Result<String, RegistryError> {
        let path = url
            .strip_prefix(&format!("{DEFAULT_REGISTRY_URL}/"))
            .ok_or_else(|| RegistryError::failed(format!("GET {url} failed: 404")))?;
        std::fs::read_to_string(self.root.join(path))
            .map_err(|error| RegistryError::failed(format!("GET {url}: {error}")))
    }
}

async fn built_registry_server(cache: &TempDir) -> McpServer<FolderFetcher> {
    let context = RegistryContext::new(
        cache.path().join("manifests"),
        DEFAULT_REGISTRY_URL.into(),
        FolderFetcher { root: registry_root() },
    );
    let calls = call_context(cache.path(), &[], Rc::new(FixedClient::new(HttpResponse::default())));
    let catalog = load_catalog(&[], context, calls.clone()).await.unwrap();
    McpServer::new(catalog, Rc::new(WireLog::disabled(WireLogRole::Server)), calls)
}

fn read_fixture(name: &str) -> Value {
    let path = Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/fixtures").join(name);
    serde_json::from_str(&std::fs::read_to_string(path).unwrap()).unwrap()
}

/// JSON with every object's keys sorted, as `apps/cli/test/fixtures/to-canonical-json.ts` writes it.
fn to_canonical_json(value: &Value) -> String {
    match value {
        Value::Array(items) => format!(
            "[{}]",
            items.iter().map(to_canonical_json).collect::<Vec<_>>().join(",")
        ),
        Value::Object(map) => {
            let sorted: BTreeMap<&String, &Value> = map.iter().collect();
            let entries: Vec<String> = sorted
                .into_iter()
                .map(|(key, item)| format!("{}:{}", Value::String(key.clone()), to_canonical_json(item)))
                .collect();
            format!("{{{}}}", entries.join(","))
        }
        other => other.to_string(),
    }
}

fn digest(tool: &Value) -> String {
    Sha256::digest(to_canonical_json(tool).as_bytes())
        .iter()
        .map(|byte| format!("{byte:02x}"))
        .collect()
}

/// Node and serde_json word a JSON syntax error differently, so only the code and the prefix are compared; each side
/// reports its own build as the server version.
fn without_build_details(response: &Value) -> Value {
    let mut response = response.clone();
    if let Some(version) = response.pointer_mut("/result/serverInfo/version") {
        *version = json!("...");
    }
    if response["error"]["code"] == json!(PARSE_ERROR) {
        let message = response["error"]["message"].as_str().unwrap_or_default();
        assert!(message.starts_with("parse error: "), "{message}");
        response["error"]["message"] = json!("parse error: ...");
    }
    response
}

async fn list_tools(server: &McpServer<FolderFetcher>) -> Vec<Value> {
    let line = json!({ "jsonrpc": "2.0", "id": 1, "method": "tools/list" }).to_string();
    let response = server.handle_line(&line).await.response.unwrap();
    response["result"]["tools"].as_array().unwrap().clone()
}

/// Regenerate both fixtures with `apps/cli/test/session-golden.generate.test.ts` whenever the registry changes.
#[tokio::test]
async fn answers_a_client_session_as_the_typescript_cli_does() {
    let cache = TempDir::new().unwrap();
    let server = built_registry_server(&cache).await;

    let initialized = server
        .handle_line(read_fixture("session.json")[0]["line"].as_str().unwrap())
        .await;
    assert_eq!(
        initialized.response.unwrap()["result"]["serverInfo"]["version"],
        env!("CARGO_PKG_VERSION")
    );

    for step in read_fixture("session.json").as_array().unwrap() {
        let line = step["line"].as_str().unwrap();
        let handled = server.handle_line(line).await;

        let actual = handled.response.unwrap_or(Value::Null);
        assert_eq!(
            without_build_details(&actual),
            without_build_details(&step["response"]),
            "response to {line}"
        );
        assert_eq!(
            handled.tools_changed, step["toolsChanged"],
            "tools changed after {line}"
        );
    }
}

#[tokio::test]
async fn lists_every_tool_as_the_typescript_cli_does() {
    let cache = TempDir::new().unwrap();
    let server = built_registry_server(&cache).await;
    let index: Value =
        serde_json::from_str(&std::fs::read_to_string(registry_root().join("index.json")).unwrap()).unwrap();
    let upstream_sections: HashSet<String> = index["servers"]
        .as_array()
        .unwrap()
        .iter()
        .filter(|entry| entry["upstream"] == json!(true))
        .map(|entry| entry["id"].as_str().unwrap().replacen(':', "_", 1))
        .collect();
    let mut opened = HashSet::new();

    let tools = loop {
        let tools = list_tools(&server).await;
        let closed: Vec<String> = tools
            .iter()
            .filter(|tool| {
                tool["description"]
                    .as_str()
                    .is_some_and(|text| text.contains(SECTION_MARKER))
            })
            .filter_map(|tool| tool["name"].as_str().map(str::to_owned))
            .filter(|name| !opened.contains(name) && !upstream_sections.contains(name))
            .collect();
        if closed.is_empty() {
            break tools;
        }
        for name in closed {
            let line = json!({ "jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": { "name": name } });
            server.handle_line(&line.to_string()).await;
            opened.insert(name);
        }
    };

    let expected = read_fixture("tool-digests.json");
    let expected = expected.as_object().unwrap();
    let actual: Map<String, Value> = tools
        .iter()
        .map(|tool| (tool["name"].as_str().unwrap().to_owned(), json!(digest(tool))))
        .collect();
    let differing: Vec<&String> = expected
        .iter()
        .filter(|(name, sum)| actual.get(*name) != Some(sum))
        .map(|(name, _)| name)
        .chain(actual.keys().filter(|name| !expected.contains_key(*name)))
        .collect();
    assert!(differing.is_empty(), "{} tools differ: {differing:?}", differing.len());
    assert_eq!(actual.len(), expected.len());
}
