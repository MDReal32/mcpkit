use crate::mcp::consts::{DEFAULT_PROTOCOL_VERSION, SERVER_NAME};
use serde_json::{Map, Value, json};

pub fn initialize(params: Option<&Map<String, Value>>) -> Value {
    let protocol_version = match params.and_then(|params| params.get("protocolVersion")) {
        Some(Value::String(requested)) => requested.as_str(),
        _ => DEFAULT_PROTOCOL_VERSION,
    };
    json!({
        "protocolVersion": protocol_version,
        "capabilities": { "tools": { "listChanged": true } },
        "serverInfo": { "name": SERVER_NAME, "version": env!("CARGO_PKG_VERSION") },
    })
}
