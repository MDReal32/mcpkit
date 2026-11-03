use indexmap::IndexMap;
use mcpkit_auth::ResolvedAuth;
use mcpkit_execution::request::{build_request, load_file_args, prepare_tool_args};
use mcpkit_http::HttpRequest;
use mcpkit_manifest::Manifest;
use mcpkit_manifest::domain::apply_domain;
use mcpkit_manifest::tool::ToolSpec;
use serde::Deserialize;
use serde_json::{Map, Value};
use std::path::{Path, PathBuf};

/// What `packages/core/test/request-golden.generate.test.ts` writes.
#[derive(Deserialize)]
struct RequestGolden {
    uploads: IndexMap<String, Vec<u8>>,
    manifests: IndexMap<String, Manifest>,
    cases: Vec<GoldenCase>,
}

#[derive(Deserialize)]
struct GoldenCase {
    server: String,
    feature: String,
    domain: Option<String>,
    tool: ToolSpec,
    args: Map<String, Value>,
    auth: ResolvedAuth,
    request: HttpRequest,
}

fn read_golden() -> RequestGolden {
    let path = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("tests/fixtures/requests.json");
    serde_json::from_str(&std::fs::read_to_string(path).unwrap()).unwrap()
}

/// Points each file argument's upload names at the copies in `dir`, as the generator did.
fn with_local_paths(tool: &ToolSpec, args: &Map<String, Value>, dir: &Path) -> Map<String, Value> {
    let to_path = |name: &Value| Value::String(dir.join(name.as_str().unwrap()).to_string_lossy().into_owned());
    args.iter()
        .map(|(name, value)| {
            let is_file = tool.request.file_args.iter().flatten().any(|file_arg| file_arg == name);
            let value = match value {
                Value::Array(names) if is_file => Value::Array(names.iter().map(to_path).collect()),
                value if is_file => to_path(value),
                value => value.clone(),
            };
            (name.clone(), value)
        })
        .collect()
}

#[tokio::test]
async fn builds_the_requests_the_typescript_executor_builds() {
    let golden = read_golden();
    let dir = tempfile::tempdir().unwrap();
    for (name, data) in &golden.uploads {
        std::fs::write(dir.path().join(name), data).unwrap();
    }
    assert!(!golden.cases.is_empty());
    for case in &golden.cases {
        let label = format!("{} {} ({})", case.server, case.tool.name, case.feature);
        let manifest = Manifest {
            tools: vec![case.tool.clone()],
            ..golden.manifests[&case.server].clone()
        };
        let resolved = apply_domain(&manifest, case.domain.as_deref());
        let tool = &resolved.tools[0];
        let args = with_local_paths(tool, &case.args, dir.path());
        let prepared = prepare_tool_args(tool, Some(&args)).unwrap();
        let loaded = load_file_args(tool, prepared).await.unwrap();

        let request = build_request(&resolved, tool, &loaded, &case.auth).unwrap();

        assert_eq!(request, case.request, "{label}");
    }
}
