use crate::session::list_all_tools;
use crate::transport::McpTransport;
use crate::upstream_error::UpstreamError;
use serde_json::{Map, Value, json};

/// A handshaken connection to an upstream. Tools and call results are kept as the upstream wrote them, since they are
/// cached and handed on as they are.
pub struct UpstreamConnection {
    transport: Box<dyn McpTransport>,
}

impl UpstreamConnection {
    pub fn new(transport: Box<dyn McpTransport>) -> Self {
        UpstreamConnection { transport }
    }

    pub async fn list_tools(&self) -> Result<Vec<Value>, UpstreamError> {
        list_all_tools(self.transport.as_ref()).await
    }

    /// The upstream's `tools/call` result; no arguments are sent as `{}`.
    pub async fn call_tool(&self, name: &str, arguments: Option<Map<String, Value>>) -> Result<Value, UpstreamError> {
        let params = json!({ "name": name, "arguments": arguments.unwrap_or_default() });
        self.transport.request("tools/call", Some(params)).await
    }

    pub fn is_open(&self) -> bool {
        self.transport.is_open()
    }

    pub async fn close(&self) {
        self.transport.close().await;
    }
}
