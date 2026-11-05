use crate::consts::{CLIENT_NAME, MCP_PROTOCOL_VERSION};
use crate::transport::McpTransport;
use crate::upstream_error::UpstreamError;
use serde_json::json;

/// The MCP handshake: `initialize`, then the `notifications/initialized` notice.
pub async fn initialize_session(transport: &dyn McpTransport, client_version: &str) -> Result<(), UpstreamError> {
    let params = json!({
        "protocolVersion": MCP_PROTOCOL_VERSION,
        "capabilities": {},
        "clientInfo": { "name": CLIENT_NAME, "version": client_version },
    });
    transport.request("initialize", Some(params)).await?;
    transport.notify("notifications/initialized", None).await
}
