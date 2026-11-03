use mcpkit_manifest::Manifest;
use serde_json::{Value, json};

/// A server with one `ping:run` tool, `GET https://api.example.com/ping`, and the given auth list.
pub fn ping_manifest(name: &str, auth: Option<Value>) -> Manifest {
    let mut manifest = json!({
        "name": name,
        "category": "test",
        "version": "1.0.0",
        "description": "",
        "baseUrl": "https://api.example.com",
        "tools": [{
            "name": "ping:run",
            "description": "Ping",
            "input": { "type": "object", "properties": {} },
            "request": { "method": "GET", "path": "/ping" },
        }],
    });
    if let Some(auth) = auth {
        manifest["auth"] = auth;
    }
    serde_json::from_value(manifest).expect("the ping manifest is valid")
}
