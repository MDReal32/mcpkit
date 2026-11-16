//! The credentials form's Check button (`domain.check`) and the `applies` of auth entries, which the recorded `0.9.0`
//! golden predates.

use serde_json::{Value, json};
use usemcpkit_validation::validate_manifest;

fn manifest_with(domain: Value, applies: Value, sources: Value) -> Value {
    json!({
        "name": "jira",
        "category": "productivity",
        "version": "1.0.0",
        "baseUrl": "https://{domain}",
        "domain": domain,
        "auth": [{ "type": "bearer", "env": "JIRA_TOKEN", "applies": applies }],
        "openapi": { "sources": sources },
        "tools": [{
            "name": "ping",
            "description": "Ping",
            "input": { "type": "object", "properties": {} },
            "request": { "method": "GET", "path": "/ping" },
        }],
    })
}

fn datacenter() -> Value {
    json!({
        "name": "datacenter",
        "url": "dc-{version}.json",
        "version": { "probe": { "path": "/rest/api/2/serverInfo", "field": "version", "match": "^(\\d+\\.\\d+)" } },
    })
}

#[test]
fn accepts_a_check_and_applies_that_name_the_sources() {
    let errors = validate_manifest(&manifest_with(
        json!({ "check": true }),
        json!({ "sources": ["datacenter"], "if": "{version} >= 8.14" }),
        json!([datacenter()]),
    ));

    assert_eq!(errors, Vec::<String>::new());
}

#[test]
fn reports_a_check_without_a_versioned_source_and_unknown_or_malformed_applies() {
    let errors = validate_manifest(&manifest_with(
        json!({ "check": true }),
        json!({ "sources": ["server"], "if": 9, "below": "9" }),
        json!([{ "name": "cloud", "url": "cloud.json" }]),
    ));

    assert_eq!(
        errors,
        [
            "domain.check needs an OpenAPI source with a version probe",
            "auth[0].applies.sources names \"server\", which is not an OpenAPI source",
            "auth[0].applies.if must be a string",
            "auth[0].applies.below is not allowed; use sources and if",
        ]
    );
}

#[test]
fn reports_a_check_that_is_not_a_boolean() {
    let errors = validate_manifest(&manifest_with(
        json!({ "check": "yes" }),
        json!({}),
        json!([datacenter()]),
    ));

    assert_eq!(errors, ["domain.check must be a boolean"]);
}
