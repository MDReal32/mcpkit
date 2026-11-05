mod support;

use serde_json::{Map, Value, json};
use sha2::{Digest, Sha256};
use std::collections::{BTreeMap, HashSet};
use std::path::{Path, PathBuf};
use std::rc::Rc;
use support::{FolderFetcher, call_context, registry_root};
use tempfile::TempDir;
use usemcpkit_http::HttpResponse;
use usemcpkit_registry::{DEFAULT_REGISTRY_URL, RegistryContext};
use usemcpkit_servers::catalog::load_catalog;
use usemcpkit_servers::mcp::McpServer;
use usemcpkit_testing::{FixedClient, updates_goldens, write_golden};
use usemcpkit_wire_log::{WireLog, WireLogRole};

const SECTION_MARKER: &str = "SECTION of usemcpkit";

const PARSE_ERROR: i64 = -32700;

async fn built_registry_server(cache: &TempDir) -> McpServer<FolderFetcher> {
    let context = RegistryContext::new(
        cache.path().join("manifests"),
        DEFAULT_REGISTRY_URL.into(),
        FolderFetcher::new(registry_root(), DEFAULT_REGISTRY_URL),
    );
    let calls = call_context(cache.path(), &[], Rc::new(FixedClient::new(HttpResponse::default())));
    let catalog = load_catalog(&[], context, calls.clone()).await.unwrap();
    McpServer::new(catalog, Rc::new(WireLog::disabled(WireLogRole::Server)), calls)
}

fn fixture_path(name: &str) -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/fixtures").join(name)
}

fn read_fixture(name: &str) -> Value {
    serde_json::from_str(&std::fs::read_to_string(fixture_path(name)).unwrap()).unwrap()
}

/// JSON with every object's keys sorted, the text each tool digest is taken of.
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

/// Only the code and the prefix of a parse error are compared, and never the server version: the fixture was first
/// written by the TypeScript CLI, whose JSON syntax errors and version differ.
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

/// Rewrite both fixtures with `UPDATE_GOLDENS=1 cargo test -p usemcpkit-servers` whenever the registry changes.
#[tokio::test]
async fn answers_the_recorded_client_session() {
    let cache = TempDir::new().unwrap();
    let server = built_registry_server(&cache).await;

    let initialized = server
        .handle_line(read_fixture("session.json")[0]["line"].as_str().unwrap())
        .await;
    assert_eq!(
        initialized.response.unwrap()["result"]["serverInfo"]["version"],
        env!("CARGO_PKG_VERSION")
    );

    let mut recorded = Vec::new();
    for step in read_fixture("session.json").as_array().unwrap() {
        let line = step["line"].as_str().unwrap();
        let handled = server.handle_line(line).await;

        let actual = handled.response.unwrap_or(Value::Null);
        if updates_goldens() {
            recorded.push(json!({ "line": line, "response": actual, "toolsChanged": handled.tools_changed }));
            continue;
        }
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
    if updates_goldens() {
        write_golden(&fixture_path("session.json"), &Value::Array(recorded));
    }
}

#[tokio::test]
async fn lists_every_tool_of_the_built_registry() {
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
    if updates_goldens() {
        write_golden(&fixture_path("tool-digests.json"), &Value::Object(actual));
        return;
    }
    let differing: Vec<&String> = expected
        .iter()
        .filter(|(name, sum)| actual.get(*name) != Some(sum))
        .map(|(name, _)| name)
        .chain(actual.keys().filter(|name| !expected.contains_key(*name)))
        .collect();
    assert!(differing.is_empty(), "{} tools differ: {differing:?}", differing.len());
    assert_eq!(actual.len(), expected.len());
}
