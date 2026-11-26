//! `domain.discover`, which the recorded `0.9.0` golden predates.

use serde_json::{Value, json};
use usemcpkit_validation::validate_manifest;

fn manifest_with(discover: Value) -> Value {
    json!({
        "name": "demo",
        "category": "test",
        "version": "1.0.0",
        "baseUrl": "https://{domain}",
        "domain": { "loopbackHttp": true, "discover": discover },
        "tools": [{
            "name": "ping",
            "description": "Ping",
            "input": { "type": "object", "properties": {} },
            "request": { "method": "GET", "path": "/ping" },
        }],
    })
}

fn valid_discovery() -> Value {
    json!({
        "host": "127.0.0.1",
        "ports": [
            { "type": "env", "name": "DEMO_PORT" },
            { "type": "log", "files": ["~/logs/demo*.log"], "pattern": "port (\\d+)" },
        ],
    })
}

#[test]
fn accepts_env_and_log_port_sources() {
    assert_eq!(
        validate_manifest(&manifest_with(valid_discovery())),
        Vec::<String>::new()
    );
}

#[test]
fn rejects_a_discovery_that_is_not_an_object() {
    assert_eq!(
        validate_manifest(&manifest_with(json!("127.0.0.1"))),
        ["domain.discover must be an object"]
    );
}

#[test]
fn rejects_a_host_with_a_port_or_a_path() {
    for host in ["127.0.0.1:80", "localhost/x", ""] {
        let mut discovery = valid_discovery();
        discovery["host"] = json!(host);

        assert_eq!(
            validate_manifest(&manifest_with(discovery)),
            ["domain.discover.host must be a host name or address"],
            "{host}"
        );
    }
}

#[test]
fn requires_at_least_one_port_source() {
    let discovery = json!({ "host": "127.0.0.1", "ports": [] });

    assert_eq!(
        validate_manifest(&manifest_with(discovery)),
        ["domain.discover.ports must be a non-empty array"]
    );
}

#[test]
fn rejects_unknown_and_incomplete_port_sources() {
    let discovery = json!({
        "host": "127.0.0.1",
        "ports": [
            { "type": "socket" },
            { "type": "env", "name": "" },
            { "type": "log", "files": [], "pattern": "no group" },
            "env",
        ],
    });

    assert_eq!(
        validate_manifest(&manifest_with(discovery)),
        [
            "domain.discover.ports[0].type must be \"env\" or \"log\"",
            "domain.discover.ports[1].name must be a non-empty string",
            "domain.discover.ports[2].files must be a non-empty list of glob patterns",
            "domain.discover.ports[2].pattern must be a regular expression with a capture group",
            "domain.discover.ports[3] must be an object",
        ]
    );
}
