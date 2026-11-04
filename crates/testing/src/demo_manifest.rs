use crate::consts::DEMO_TOKEN_URL;
use serde_json::{Value, json};
use usemcpkit_manifest::Manifest;

/// The `demo` server of the TypeScript executor tests, with its `list_items` and `create_item` tools.
pub fn demo_manifest() -> Manifest {
    serde_json::from_value(json!({
        "name": "demo",
        "category": "test",
        "version": "1.0.0",
        "baseUrl": "https://api.example.com/",
        "headers": { "Accept": "application/json" },
        "tools": [
            {
                "name": "list_items",
                "description": "List items",
                "input": {
                    "type": "object",
                    "properties": {
                        "owner": { "type": "string" },
                        "state": { "type": "string", "default": "open" },
                        "page": { "type": "number" },
                    },
                    "required": ["owner"],
                },
                "request": { "method": "GET", "path": "/owners/{owner}/items", "query": { "s": "state", "page": "page" } },
                "response": { "root": "data", "fields": { "id": "id", "author": "user.login" } },
            },
            {
                "name": "create_item",
                "description": "Create an item",
                "input": {
                    "type": "object",
                    "properties": { "owner": { "type": "string" }, "title": { "type": "string" } },
                    "required": ["owner", "title"],
                },
                "request": { "method": "POST", "path": "/owners/{owner}/items", "body": ["title"] },
            },
        ],
    }))
    .expect("the demo manifest is valid")
}

/// The OAuth2 entry of the TypeScript tests, as manifest JSON.
pub fn demo_oauth() -> Value {
    json!({
        "type": "oauth",
        "authorizationUrl": "https://auth.example.com/authorize",
        "tokenUrl": DEMO_TOKEN_URL,
        "clientId": "client-1",
        "scopes": ["repo", "user"],
        "redirectPort": 0,
    })
}
