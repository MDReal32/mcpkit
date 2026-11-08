//! `{domain}` in the URLs the recorded `0.9.0` golden predates: an oauth `discovery` url and an HTTP upstream's `url`.

use serde_json::{Value, json};
use usemcpkit_validation::validate_manifest;

const DOMAIN_SPEC: &str = "domain";

fn upstream_manifest(upstream_url: &str, discovery: &str) -> Value {
    json!({
        "name": "demo",
        "category": "test",
        "version": "1.0.0",
        "baseUrl": "https://mcp.example.com",
        "auth": [{ "type": "oauth", "discovery": discovery }],
        "upstream": { "type": "http", "url": upstream_url },
        "tools": [],
    })
}

fn with_domain(mut manifest: Value) -> Value {
    manifest[DOMAIN_SPEC] = json!({ "label": "Host", "env": "DEMO_HOST", "loopbackHttp": true });
    manifest
}

#[test]
fn requires_a_domain_when_only_the_discovery_url_uses_it() {
    let errors = validate_manifest(&upstream_manifest(
        "https://mcp.example.com/mcp",
        "https://{domain}/mcp",
    ));

    assert_eq!(errors, ["domain is required when a URL uses {domain}"]);
}

#[test]
fn requires_a_domain_when_only_the_upstream_url_uses_it() {
    let errors = validate_manifest(&upstream_manifest(
        "https://{domain}/mcp",
        "https://mcp.example.com/mcp",
    ));

    assert_eq!(errors, ["domain is required when a URL uses {domain}"]);
}

#[test]
fn accepts_a_domain_used_only_by_the_upstream_and_its_discovery() {
    let errors = validate_manifest(&with_domain(upstream_manifest(
        "https://{domain}/mcp",
        "https://{domain}/mcp",
    )));

    assert_eq!(errors, Vec::<String>::new());
}
