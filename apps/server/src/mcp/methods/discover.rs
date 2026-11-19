use crate::mcp::consts::{MODERN_PROTOCOL_VERSIONS, RESULT_TYPE_COMPLETE, SERVER_INFO_META_KEY, SERVER_NAME};
use serde_json::{Value, json};

/// The `server/discover` result of the modern MCP versions: the versions this server speaks, its capabilities and,
/// under `_meta`, its name and version.
pub fn discover() -> Value {
    json!({
        "resultType": RESULT_TYPE_COMPLETE,
        "supportedVersions": MODERN_PROTOCOL_VERSIONS,
        "capabilities": { "tools": {} },
        "_meta": {
            SERVER_INFO_META_KEY: { "name": SERVER_NAME, "version": env!("CARGO_PKG_VERSION") },
        },
    })
}
