use crate::transport::http_transport::HttpTransport;
use crate::transport::mcp_transport::McpTransport;
use crate::transport::stdio_transport::StdioTransport;
use crate::upstream_error::UpstreamError;
use crate::upstream_options::UpstreamOptions;
use mcpkit_manifest::upstream::UpstreamSpec;

/// A stdio spec must already be prepared: its repository cloned and `{repo}` replaced.
pub fn create_transport(
    spec: &UpstreamSpec,
    options: &UpstreamOptions,
) -> Result<Box<dyn McpTransport>, UpstreamError> {
    match spec {
        UpstreamSpec::Http(http) => Ok(Box::new(HttpTransport::new(http, options))),
        UpstreamSpec::Stdio(stdio) => Ok(Box::new(StdioTransport::start(stdio, options)?)),
    }
}
