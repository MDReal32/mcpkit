mod support;

use mcpkit_http::HttpResponse;
use mcpkit_registry::{DEFAULT_REGISTRY_URL, Fetch, RegistryContext, RegistryError};
use mcpkit_server::catalog::load_catalog;
use mcpkit_server::mcp::{ExposedEntry, ExposedSection, McpServer, ToolAnnotations};
use mcpkit_testing::FixedClient;
use mcpkit_wire_log::{WireLog, WireLogRole};
use serde_json::{Value, json};
use std::path::PathBuf;
use std::rc::Rc;
use support::{call_context, registry_root};

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

/// The shape `apps/cli/test/exposure-golden.generate.test.ts` writes for each entry.
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

/// Regenerate the fixture with the generator test whenever the registry changes.
#[tokio::test]
async fn exposes_the_names_the_typescript_cli_exposes() {
    let cache = tempfile::tempdir().unwrap();
    let context = RegistryContext::new(
        cache.path().join("manifests"),
        DEFAULT_REGISTRY_URL.into(),
        FolderFetcher { root: registry_root() },
    );
    let calls = call_context(cache.path(), &[], Rc::new(FixedClient::new(HttpResponse::default())));
    let catalog = load_catalog(&[], context, calls.clone()).await.unwrap();
    let ids: Vec<String> = catalog
        .servers
        .iter()
        .filter(|server| !server.upstream)
        .map(|server| server.id.clone())
        .collect();
    let server = McpServer::new(catalog, Rc::new(WireLog::disabled(WireLogRole::Server)), calls);

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
    let fixture =
        std::fs::read_to_string(PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("tests/fixtures/exposed-tools.json"))
            .unwrap();
    let expected: Vec<Value> = serde_json::from_str(&fixture).unwrap();
    for (index, (actual, wanted)) in exposed.iter().zip(&expected).enumerate() {
        assert_eq!(actual, wanted, "entry {index} differs");
    }
    assert_eq!(exposed.len(), expected.len());
}
