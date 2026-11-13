//! The `openapi` block of a manifest whose tools are built on the user's machine, which the recorded `0.9.0` golden
//! predates.

use serde_json::{Value, json};
use usemcpkit_validation::validate_manifest;

fn manifest_with(openapi: Value, tools: Value) -> Value {
    json!({
        "name": "github",
        "category": "git",
        "version": "1.0.0",
        "baseUrl": "https://{domain}",
        "domain": { "default": "api.github.com" },
        "auth": [{ "type": "bearer", "env": "GITHUB_TOKEN" }],
        "openapi": openapi,
        "tools": tools,
    })
}

fn ghes() -> Value {
    json!({
        "name": "ghes",
        "label": "Enterprise Server",
        "url": "https://example.com/ghes-{version}.json",
        "basePath": "/api/v3",
        "version": {
            "probe": { "path": "/meta", "field": "installed_version", "match": "^(\\d+\\.\\d+)" },
            "list": { "url": "https://example.com/versions.json", "field": "name", "match": "^ghes-(\\d+\\.\\d+)$" },
            "env": "GITHUB_VERSION",
        },
        "options": { "maxDepth": 2, "skip": ["^GET /enterprise"], "fixedQuery": { "per_page": 30 } },
    })
}

#[test]
fn accepts_sources_without_tools_of_its_own() {
    let openapi = json!({
        "sources": [
            { "name": "dotcom", "hosts": ["api.github.com"], "url": "github/api.json", "sha256": "a".repeat(64) },
            ghes(),
        ],
    });

    assert_eq!(
        validate_manifest(&manifest_with(openapi, json!([]))),
        Vec::<String>::new()
    );
}

#[test]
fn checks_hand_written_tools_and_their_applies() {
    let openapi = json!({ "sources": [ghes()] });
    let tools = json!([{
        "name": "repos/{owner}/{repo}/releases/latest:get",
        "description": "Latest release",
        "input": { "type": "object", "properties": {} },
        "request": { "method": "GET", "path": "/api/v3/repos/a/b/releases/latest" },
        "applies": { "sources": ["dotcom"], "below": "3.10" },
    }]);

    assert_eq!(
        validate_manifest(&manifest_with(openapi, tools)),
        ["tools[0].applies.sources names \"dotcom\", which is not an OpenAPI source"]
    );
}

#[test]
fn reports_broken_sources() {
    let openapi = json!({
        "sources": [
            { "name": "Cloud", "url": "x-{version}.json", "sha256": "nope" },
            {
                "name": "ghes",
                "url": "y.json",
                "version": { "probe": { "path": "meta", "field": "", "match": "^\\d+" } },
                "options": { "maxDepth": 0, "skip": ["("] },
            },
            { "name": "ghes", "url": "z.json" },
        ],
    });

    assert_eq!(
        validate_manifest(&manifest_with(openapi, json!([]))),
        [
            "openapi.sources[0].name must match /^[a-z][a-z0-9-]*$/",
            "openapi.sources[0].url uses {version}, which needs a version",
            "openapi.sources[0].sha256 must be a hex SHA-256",
            "openapi.sources[1].url must use {version} for a versioned source",
            "openapi.sources[1].version.probe.path must start with /",
            "openapi.sources[1].version.probe.field must be a dotted path",
            "openapi.sources[1].version.probe.match must capture the version with ( )",
            "openapi.sources[1].options.maxDepth must be a positive integer",
            "openapi.sources[1].options.skip[0] is not a valid regular expression: regex parse error:\n    (\n    ^\nerror: unclosed group",
            "duplicate OpenAPI source names: ghes",
        ]
    );
}

#[test]
fn takes_endpoint_names_only_beside_openapi_sources() {
    let tool = |name: &str| {
        json!([{
            "name": name,
            "description": "Fixed",
            "input": { "type": "object", "properties": {} },
            "request": { "method": "GET", "path": "/x" },
        }])
    };
    let openapi = json!({ "sources": [ghes()] });
    assert_eq!(
        validate_manifest(&manifest_with(openapi.clone(), tool("rest/api/2/attachment/{id}:get"))),
        Vec::<String>::new()
    );
    assert_eq!(
        validate_manifest(&manifest_with(openapi, tool("/repos:fetch"))),
        [
            "tools[0] (/repos:fetch).name must match /^[a-z][a-z0-9_]*(:[a-z][a-z0-9_]*)*$/ or name an endpoint, <path>:<method>"
        ]
    );
    let mut plain = manifest_with(json!(null), tool("repos:get"));
    plain.as_object_mut().unwrap().remove("openapi");
    plain["tools"][0]["name"] = json!("repos/{owner}:get");
    assert_eq!(
        validate_manifest(&plain),
        ["tools[0] (repos/{owner}:get).name must match /^[a-z][a-z0-9_]*(:[a-z][a-z0-9_]*)*$/"]
    );
}
