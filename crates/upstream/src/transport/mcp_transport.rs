use crate::upstream_error::UpstreamError;
use mcpkit_core::LocalFuture;
use serde_json::Value;

/// One JSON-RPC channel to an upstream; `params` is left out of the message when `None`.
pub trait McpTransport {
    fn request<'a>(&'a self, method: &'a str, params: Option<Value>) -> LocalFuture<'a, Result<Value, UpstreamError>>;

    fn notify<'a>(&'a self, method: &'a str, params: Option<Value>) -> LocalFuture<'a, Result<(), UpstreamError>>;

    /// False once the channel is gone (a stdio child exited); an HTTP upstream has none to lose.
    fn is_open(&self) -> bool;

    fn close(&self) -> LocalFuture<'_, ()>;
}
