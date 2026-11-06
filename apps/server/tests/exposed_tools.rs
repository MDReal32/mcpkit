mod support;

use serde_json::{Value, json};
use std::path::PathBuf;
use std::rc::Rc;
use support::{FolderFetcher, call_context, registry_root};
use usemcpkit_http::HttpResponse;
use usemcpkit_registry::{DEFAULT_REGISTRY_URL, RegistryContext};
use usemcpkit_servers::catalog::load_catalog;
use usemcpkit_servers::mcp::{ExposedEntry, ExposedSection, McpServer, ToolAnnotations, ToolLoading};
use usemcpkit_testing::{FixedClient, updates_goldens, write_golden};
use usemcpkit_wire_log::{WireLog, WireLogRole};

/// One entry of `fixtures/exposed-tools.json`.
fn describe_entry(entry: &ExposedEntry) -> Value {
    match entry {
        ExposedEntry::Section(section) => json!({
            "name": section.name,
            "id": section.key(),
            "kind": "section",
            "description": section.description,
            "annotations": ToolAnnotations::READ_ONLY,
        }),
        ExposedEntry::Tool(tool) => {
            let mut described = json!({
                "name": tool.name,
                "id": format!("{}:{}", tool.server_id, tool.tool),
                "kind": "tool",
            });
            if let Some(annotations) = tool.annotations {
                described["annotations"] = json!(annotations);
            }
            described
        }
    }
}

fn sections_of(server: &McpServer<FolderFetcher>, id: &str) -> Vec<ExposedSection> {
    server
        .exposure()
        .list()
        .iter()
        .filter_map(|entry| match &**entry {
            ExposedEntry::Section(section) if section.server_id == id => Some(section.clone()),
            _ => None,
        })
        .collect()
}

/// Rewrite the fixture with `UPDATE_GOLDENS=1 cargo test -p usemcpkit-servers` whenever the registry changes.
#[tokio::test]
async fn exposes_every_section_and_tool_of_the_built_registry() {
    let cache = tempfile::tempdir().unwrap();
    let context = RegistryContext::new(
        cache.path().join("manifests"),
        DEFAULT_REGISTRY_URL.into(),
        FolderFetcher::new(registry_root(), DEFAULT_REGISTRY_URL),
    );
    let calls = call_context(cache.path(), &[], Rc::new(FixedClient::new(HttpResponse::default())));
    let catalog = load_catalog(&[], context, calls.clone()).await.unwrap();
    let ids: Vec<String> = catalog
        .servers
        .iter()
        .filter(|server| !server.upstream)
        .map(|server| server.id.clone())
        .collect();
    let server = McpServer::new(
        catalog,
        Rc::new(WireLog::disabled(WireLogRole::Server)),
        calls,
        ToolLoading::Partial,
    );

    for id in &ids {
        let root = sections_of(&server, id).remove(0);
        server.exposure().open(&root).await.unwrap();
        for group in sections_of(&server, id)
            .iter()
            .filter(|section| section.group.is_some())
        {
            server.exposure().open(group).await.unwrap();
        }
    }

    let exposed: Vec<Value> = server
        .exposure()
        .list()
        .iter()
        .map(|entry| describe_entry(entry))
        .collect();
    let fixture = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("tests/fixtures/exposed-tools.json");
    if updates_goldens() {
        write_golden(&fixture, &Value::Array(exposed));
        return;
    }
    let expected: Vec<Value> = serde_json::from_str(&std::fs::read_to_string(fixture).unwrap()).unwrap();
    for (index, (actual, wanted)) in exposed.iter().zip(&expected).enumerate() {
        assert_eq!(actual, wanted, "entry {index} differs");
    }
    assert_eq!(exposed.len(), expected.len());
}

/// Full loading lists the tools partial loading shows once every section is opened, with the same names, and keeps a
/// section only for the upstream servers it cannot load without starting them.
#[tokio::test]
async fn full_loading_lists_every_registry_tool_without_sections() {
    let cache = tempfile::tempdir().unwrap();
    let context = RegistryContext::new(
        cache.path().join("manifests"),
        DEFAULT_REGISTRY_URL.into(),
        FolderFetcher::new(registry_root(), DEFAULT_REGISTRY_URL),
    );
    let calls = call_context(cache.path(), &[], Rc::new(FixedClient::new(HttpResponse::default())));
    let catalog = load_catalog(&[], context, calls.clone()).await.unwrap();
    let upstream_ids: Vec<String> = catalog
        .servers
        .iter()
        .filter(|server| server.upstream)
        .map(|server| server.id.clone())
        .collect();
    let server = McpServer::new(
        catalog,
        Rc::new(WireLog::disabled(WireLogRole::Server)),
        calls,
        ToolLoading::Full,
    );

    server.exposure().settle().await;

    let listed: Vec<Value> = server
        .exposure()
        .list()
        .iter()
        .map(|entry| describe_entry(entry))
        .collect();
    let fixture = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("tests/fixtures/exposed-tools.json");
    let expected: Vec<Value> = serde_json::from_str(&std::fs::read_to_string(fixture).unwrap()).unwrap();
    let tools = |entries: &[Value]| -> Vec<Value> {
        entries
            .iter()
            .filter(|entry| entry["kind"] == "tool")
            .cloned()
            .collect()
    };
    assert_eq!(tools(&listed), tools(&expected));
    let sections: Vec<&str> = listed
        .iter()
        .filter(|entry| entry["kind"] == "section")
        .map(|entry| entry["id"].as_str().unwrap())
        .collect();
    assert_eq!(sections, upstream_ids);
}
