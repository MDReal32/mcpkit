//! A manifest may carry tools of its own beside an upstream, and an HTTP upstream may sign in with its own `auth`.

use serde_json::{Value, json};
use usemcpkit_validation::validate_manifest;

fn manifest(upstream: Value, tools: Value) -> Value {
    json!({
        "name": "demo",
        "category": "test",
        "version": "1.0.0",
        "baseUrl": "https://api.example.com",
        "domain": { "label": "Host" },
        "auth": [{ "type": "header", "name": "X-Key", "env": "DEMO_KEY" }],
        "upstream": upstream,
        "tools": tools,
    })
}

fn ping() -> Value {
    json!({
        "name": "ping:run",
        "description": "Ping",
        "input": { "type": "object", "properties": {} },
        "request": { "method": "GET", "path": "/ping" },
    })
}

fn http_upstream() -> Value {
    json!({
        "type": "http",
        "url": "https://{domain}/mcp",
        "auth": [
            { "type": "oauth", "discovery": "https://{domain}/mcp" },
            { "type": "bearer", "env": "DEMO_MCP_TOKEN" },
        ],
    })
}

#[test]
fn accepts_tools_beside_an_upstream_with_its_own_auth() {
    assert_eq!(
        validate_manifest(&manifest(http_upstream(), json!([ping()]))),
        Vec::<String>::new()
    );
}

#[test]
fn still_accepts_an_upstream_with_no_tools() {
    assert_eq!(
        validate_manifest(&manifest(http_upstream(), json!([]))),
        Vec::<String>::new()
    );
}

#[test]
fn reports_an_invalid_tool_beside_an_upstream() {
    let errors = validate_manifest(&manifest(http_upstream(), json!([{ "name": "ping:run" }])));

    assert!(!errors.is_empty());
    assert!(errors.iter().all(|error| error.starts_with("tools[0]")), "{errors:?}");
}

#[test]
fn names_the_upstream_when_its_own_auth_is_invalid() {
    let upstream = json!({
        "type": "http",
        "url": "https://{domain}/mcp",
        "auth": [{ "type": "bearer", "env": "DEMO_MCP_TOKEN" }, { "type": "oauth", "discovery": "https://{domain}/mcp" }],
    });

    assert_eq!(
        validate_manifest(&manifest(upstream, json!([ping()]))),
        vec!["upstream.auth: fallback entries must come after every oauth entry".to_owned()]
    );
}

#[test]
fn needs_a_domain_for_the_templates_of_the_upstream_auth() {
    let mut without_domain = manifest(http_upstream(), json!([ping()]));
    without_domain.as_object_mut().unwrap().remove("domain");

    let errors = validate_manifest(&without_domain);

    assert!(errors.iter().any(|error| error.contains("domain")), "{errors:?}");
}
