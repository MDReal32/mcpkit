mod support;

use serde_json::{Map, Value, json};
use sha2::{Digest, Sha256};
use std::collections::BTreeMap;
use std::path::{Path, PathBuf};
use std::rc::Rc;
use support::{FolderFetcher, call_context, registry_root, run_code};
use tempfile::TempDir;
use usemcpkit_execution::CallContext;
use usemcpkit_http::HttpResponse;
use usemcpkit_registry::{DEFAULT_REGISTRY_URL, RegistryContext};
use usemcpkit_servers::catalog::{RegistryCatalog, load_catalog};
use usemcpkit_servers::mcp::{McpServer, SEARCH_TOOL};
use usemcpkit_testing::{FixedClient, updates_goldens, write_golden};

const PARSE_ERROR: i64 = -32700;

/// The catalog of every server in the built registry, cached in `cache`.
async fn built_registry_catalog(cache: &TempDir) -> (RegistryCatalog<FolderFetcher>, CallContext) {
    let context = RegistryContext::new(
        cache.path().join("manifests"),
        DEFAULT_REGISTRY_URL.into(),
        FolderFetcher::new(registry_root(), DEFAULT_REGISTRY_URL),
    );
    let calls = call_context(cache.path(), &[], Rc::new(FixedClient::new(HttpResponse::default())));
    (load_catalog(&[], context, calls.clone()).await.unwrap(), calls)
}

async fn built_registry_server(cache: &TempDir) -> McpServer<FolderFetcher> {
    let (catalog, calls) = built_registry_catalog(cache).await;
    McpServer::new(catalog, calls)
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

/// Only the code and the prefix of a parse error are compared, and never the server version, which change with the
/// JSON parser and every release.
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
            recorded.push(json!({ "line": line, "response": actual }));
            continue;
        }
        assert_eq!(
            without_build_details(&actual),
            without_build_details(&step["response"]),
            "response to {line}"
        );
    }
    if updates_goldens() {
        write_golden(&fixture_path("session.json"), &Value::Array(recorded));
    }
}

/// What `search` hands the model for every tool of the built registry, as `codemode.tools` describes it, keyed by id.
#[tokio::test]
async fn describes_every_tool_of_the_built_registry() {
    let cache = TempDir::new().unwrap();
    let (catalog, _calls) = built_registry_catalog(&cache).await;
    let server = built_registry_server(&cache).await;
    let mut actual = Map::new();

    for registry_server in &catalog.servers {
        let id = &registry_server.id;
        if registry_server.upstream && !catalog.has_own_tools(id).await.unwrap() {
            continue;
        }
        let groups = catalog.load_groups(id).await.unwrap();
        let groups: Vec<Option<&str>> = if groups.is_empty() {
            vec![None]
        } else {
            groups.iter().map(|group| Some(group.as_str())).collect()
        };
        let mut count = 0;
        for group in groups {
            let manifest = catalog.load_group_manifest(id, group).await.unwrap();
            for tool in manifest.tools {
                let tool_id = format!("{id}:{}", tool.name);
                let described = json!({ "id": tool_id, "description": tool.description, "inputSchema": tool.input });
                actual.insert(tool_id, json!(digest(&described)));
                count += 1;
            }
        }
        if registry_server.upstream {
            continue;
        }
        let code = format!(
            "async () => (await codemode.tools({})).length",
            Value::String(id.clone())
        );
        let found = run_code(&server, SEARCH_TOOL, &code).await;
        assert_eq!(found["content"][0]["text"], json!(count.to_string()), "search on {id}");
    }
    let every_tool = run_code(
        &server,
        SEARCH_TOOL,
        "async () => { const ids = (await codemode.tools()).map((tool) => tool.id); return [ids.length, new Set(ids).size]; }",
    )
    .await;
    let every_tool: Value = serde_json::from_str(every_tool["content"][0]["text"].as_str().unwrap()).unwrap();
    assert_eq!(
        every_tool,
        json!([actual.len(), actual.len()]),
        "codemode.tools() lists every tool of the registry once, leaving out the tools of the upstreams nobody started"
    );

    if updates_goldens() {
        write_golden(&fixture_path("tool-digests.json"), &Value::Object(actual));
        return;
    }
    let expected = read_fixture("tool-digests.json");
    let expected = expected.as_object().unwrap();
    let differing: Vec<&String> = expected
        .iter()
        .filter(|(name, sum)| actual.get(*name) != Some(sum))
        .map(|(name, _)| name)
        .chain(actual.keys().filter(|name| !expected.contains_key(*name)))
        .collect();
    assert!(differing.is_empty(), "{} tools differ: {differing:?}", differing.len());
    assert_eq!(actual.len(), expected.len());
}
