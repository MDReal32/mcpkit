mod support;

use serde_json::{Value, json};
use sha2::{Digest, Sha256};
use std::path::Path;
use std::rc::Rc;
use support::{FolderFetcher, call_context, run_code};
use tempfile::TempDir;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_registry::RegistryContext;
use usemcpkit_servers::catalog::RegistryCatalog;
use usemcpkit_servers::mcp::{EXECUTE_TOOL, McpServer, SEARCH_TOOL};
use usemcpkit_testing::{RouteClient, json_response};

const REGISTRY_URL: &str = "https://registry.test";

const VERSION_URL: &str = "https://pets.test/api/version";

fn pets_manifest() -> Value {
    json!({
        "name": "pets",
        "category": "test",
        "version": "1.0.0",
        "description": "Pets",
        "baseUrl": "https://{domain}",
        "domain": { "env": "PETS_HOST" },
        "auth": [{ "type": "bearer", "env": "PETS_TOKEN" }],
        "openapi": {
            "sources": [{
                "name": "selfhosted",
                "url": "specs/pets-{version}.json",
                "version": {
                    "probe": { "path": "/api/version", "field": "version", "match": "^(\\d+\\.\\d+)" },
                    "list": { "url": "specs/versions.json", "match": "^(\\d+\\.\\d+)$" },
                },
            }, {
                "name": "owners",
                "url": "specs/owners.json",
            }],
        },
        "tools": [{
            "name": "pets/{petId}:get",
            "description": "Gets a pet the way 2.2 and 2.3 really answer",
            "input": { "type": "object", "properties": { "id": { "type": "string" } }, "required": ["id"] },
            "request": { "method": "GET", "path": "/pets/{id}/details" },
            "applies": { "if": "2.2 <= {version} < 2.4" },
        }, {
            "name": "pets:get",
            "description": "Lists the pets of a server older than every published document",
            "input": { "type": "object", "properties": {} },
            "request": { "method": "GET", "path": "/legacy/pets" },
            "applies": { "sources": ["selfhosted"], "if": "1.0 <= {version} < 2.1" },
        }],
    })
}

fn pets_spec(with_delete: bool) -> Value {
    let mut item = json!({
        "get": {
            "summary": "Get a pet",
            "parameters": [{ "name": "petId", "in": "path", "required": true, "schema": { "type": "string" } }],
            "responses": { "200": { "description": "A pet" } },
        },
    });
    if with_delete {
        item["delete"] = json!({
            "summary": "Delete a pet",
            "parameters": [{ "name": "petId", "in": "path", "required": true, "schema": { "type": "string" } }],
            "responses": { "204": { "description": "Deleted" } },
        });
    }
    json!({
        "openapi": "3.0.3",
        "info": { "title": "Pets", "version": "2" },
        "paths": {
            "/pets": {
                "get": {
                    "summary": "List pets",
                    "parameters": [{ "name": "limit", "in": "query", "schema": { "type": "integer" } }],
                    "responses": { "200": { "description": "Pets" } },
                },
            },
            "/pets/{petId}": item,
        },
    })
}

fn owners_spec() -> Value {
    json!({
        "openapi": "3.0.3",
        "info": { "title": "Owners", "version": "1" },
        "paths": {
            "/owners": { "get": { "summary": "List owners", "responses": { "200": { "description": "Owners" } } } },
            "/pets": { "get": { "summary": "Pets of the owners", "responses": { "200": { "description": "Pets" } } } },
        },
    })
}

fn write(root: &Path, path: &str, text: &str) {
    let file = root.join(path);
    std::fs::create_dir_all(file.parent().unwrap()).unwrap();
    std::fs::write(file, text).unwrap();
}

fn pets_server(home: &TempDir, http: Rc<RouteClient>) -> McpServer<FolderFetcher> {
    let registry = home.path().join("registry");
    let text = pets_manifest().to_string();
    write(&registry, "test/pets.json", &text);
    write(&registry, "specs/versions.json", &json!(["2.1", "2.4"]).to_string());
    write(&registry, "specs/pets-2.1.json", &pets_spec(false).to_string());
    write(&registry, "specs/pets-2.4.json", &pets_spec(true).to_string());
    write(&registry, "specs/owners.json", &owners_spec().to_string());
    let servers = vec![RegistryServer {
        id: "test:pets".into(),
        version: "1.0.0".into(),
        url: "test/pets.json".into(),
        sha256: format!("{:x}", Sha256::digest(text.as_bytes())),
        description: Some("Pets".into()),
        upstream: false,
        openapi: true,
    }];
    let context = RegistryContext::new(
        home.path().join("manifests"),
        REGISTRY_URL.into(),
        FolderFetcher::new(registry, REGISTRY_URL),
    );
    let env = [("PETS_HOST", "pets.test"), ("PETS_TOKEN", "token")];
    let calls = call_context(&home.path().join("home"), &env, http);
    McpServer::new(RegistryCatalog::new(servers, context, calls.clone()), calls)
}

fn pets_api() -> Rc<RouteClient> {
    pets_api_at("2.3.7")
}

fn pets_api_at(version: &str) -> Rc<RouteClient> {
    Rc::new(RouteClient::new([
        (
            VERSION_URL.to_owned(),
            json_response(200, &json!({ "version": version })),
        ),
        (
            "https://pets.test/legacy/pets".to_owned(),
            json_response(200, &json!([{ "id": "1", "name": "Old Rex" }])),
        ),
        (
            "https://pets.test/pets/7/details".to_owned(),
            json_response(200, &json!({ "id": "7", "name": "Rex" })),
        ),
    ]))
}

fn text_of(result: &Value) -> &str {
    result["content"][0]["text"].as_str().unwrap()
}

#[tokio::test]
async fn lists_no_tools_with_a_note_before_they_are_built() {
    let home = TempDir::new().unwrap();
    let http = pets_api();
    let server = pets_server(&home, Rc::clone(&http));

    let result = run_code(&server, SEARCH_TOOL, "async () => codemode.tools()").await;

    let text = text_of(&result);
    assert!(
        text.contains("test:pets: its tools are built from the OpenAPI document"),
        "{text}"
    );
    assert!(text.ends_with("[]"), "{text}");
    assert!(http.requests.borrow().is_empty());
}

#[tokio::test]
async fn builds_the_tools_of_every_source_from_the_nearest_older_document_and_keeps_them() {
    let home = TempDir::new().unwrap();
    let http = pets_api();
    let server = pets_server(&home, Rc::clone(&http));

    let listed = run_code(
        &server,
        SEARCH_TOOL,
        r#"async () => (await codemode.tools("test:pets")).map((tool) => [tool.id, tool.description])"#,
    )
    .await;
    let called = run_code(
        &server,
        EXECUTE_TOOL,
        r#"async () => codemode.call("test:pets:pets/{petId}:get", { id: "7" })"#,
    )
    .await;

    let text = text_of(&listed);
    assert!(
        text.contains("no OpenAPI document of selfhosted is published for 2.3; its tools come from the one of 2.1"),
        "{text}"
    );
    assert!(
        text.contains("\"test:pets:pets/{petId}:get\",\n    \"Gets a pet the way 2.2 and 2.3 really answer\""),
        "{text}"
    );
    assert!(text.contains("\"test:pets:pets:get\",\n    \"List pets"), "{text}");
    assert!(text.contains("\"test:pets:owners:get\""), "{text}");
    assert!(!text.contains("Pets of the owners"), "{text}");
    assert!(!text.contains("delete"), "{text}");
    assert!(text_of(&called).contains("\"name\": \"Rex\""), "{called}");

    let dir = home.path().join("manifests/openapi/test/pets");
    let hosts: Value = serde_json::from_str(&std::fs::read_to_string(dir.join("hosts.json")).unwrap()).unwrap();
    assert_eq!(
        hosts["pets.test"]["sources"],
        json!([
            { "source": "selfhosted", "version": "2.3", "specVersion": "2.1" },
            { "source": "owners" },
        ])
    );
    assert!(dir.join("selfhosted@2.1.yaml").is_file());
    assert!(dir.join("selfhosted@2.1.json").is_file());
    assert!(dir.join("owners.json").is_file());

    let probes = |client: &RouteClient| {
        client
            .requests
            .borrow()
            .iter()
            .filter(|request| request.url == VERSION_URL)
            .count()
    };
    assert_eq!(probes(&http), 1);

    let later_http = pets_api();
    let later = pets_server(&home, Rc::clone(&later_http));
    let cached = run_code(
        &later,
        SEARCH_TOOL,
        r#"async () => (await codemode.tools()).map((tool) => tool.id)"#,
    )
    .await;
    assert!(text_of(&cached).contains("\"test:pets:pets:get\""), "{cached}");
    assert!(later_http.requests.borrow().is_empty());
}

#[tokio::test]
async fn serves_only_the_hand_written_tools_of_a_version_older_than_every_document() {
    let home = TempDir::new().unwrap();
    let http = pets_api_at("1.9.2");
    let server = pets_server(&home, Rc::clone(&http));

    let listed = run_code(
        &server,
        SEARCH_TOOL,
        r#"async () => (await codemode.tools("test:pets")).map((tool) => [tool.id, tool.description])"#,
    )
    .await;
    let called = run_code(
        &server,
        EXECUTE_TOOL,
        r#"async () => codemode.call("test:pets:pets:get", {})"#,
    )
    .await;

    let text = text_of(&listed);
    assert!(
        text.contains(
            "no OpenAPI document of selfhosted is published for 1.9 or older; only its hand-written tools are served"
        ),
        "{text}"
    );
    assert!(
        text.contains("\"Lists the pets of a server older than every published document\""),
        "{text}"
    );
    assert!(text.contains("\"test:pets:owners:get\""), "{text}");
    assert!(!text.contains("pets/{petId}:get"), "{text}");
    assert!(text_of(&called).contains("Old Rex"), "{called}");

    let dir = home.path().join("manifests/openapi/test/pets");
    let hosts: Value = serde_json::from_str(&std::fs::read_to_string(dir.join("hosts.json")).unwrap()).unwrap();
    assert_eq!(
        hosts["pets.test"]["sources"],
        json!([{ "source": "selfhosted", "version": "1.9" }, { "source": "owners" }])
    );
}

#[tokio::test]
async fn reports_a_version_older_than_every_document_that_no_hand_written_tool_covers() {
    let home = TempDir::new().unwrap();
    let server = pets_server(&home, pets_api_at("0.9"));

    let listed = run_code(&server, SEARCH_TOOL, r#"async () => codemode.tools("test:pets")"#).await;

    let text = text_of(&listed);
    assert!(
        text.contains("test:pets is unavailable: no OpenAPI document of selfhosted is published for 0.9 or older"),
        "{text}"
    );
}
