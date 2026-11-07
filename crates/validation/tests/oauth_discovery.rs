//! The `discovery` form of an `oauth` entry, which the recorded `0.9.0` golden predates.

use serde_json::{Value, json};
use usemcpkit_validation::validate_manifest;

fn manifest_with(auth: Value) -> Value {
    json!({
        "name": "demo",
        "category": "test",
        "version": "1.0.0",
        "baseUrl": "https://api.example.com/",
        "auth": [auth],
        "tools": [{
            "name": "ping",
            "description": "Ping",
            "input": { "type": "object", "properties": {} },
            "request": { "method": "GET", "path": "/ping" },
        }],
    })
}

#[test]
fn accepts_an_entry_that_names_only_the_server_to_discover() {
    let errors = validate_manifest(&manifest_with(json!({
        "type": "oauth",
        "discovery": "https://mcp.example.com/mcp",
    })));

    assert_eq!(errors, Vec::<String>::new());
}

#[test]
fn still_requires_the_endpoints_without_discovery() {
    let errors = validate_manifest(&manifest_with(json!({ "type": "oauth" })));

    assert_eq!(
        errors,
        [
            "auth[0].authorizationUrl is required for auth type \"oauth\"",
            "auth[0].tokenUrl is required for auth type \"oauth\"",
            "auth[0].clientId is required for auth type \"oauth\"",
        ]
    );
}

#[test]
fn requires_the_discovery_url_to_be_https() {
    let errors = validate_manifest(&manifest_with(json!({
        "type": "oauth",
        "discovery": "http://mcp.example.com/mcp",
    })));

    assert_eq!(errors, ["auth[0].discovery must be an https:// URL"]);
}
