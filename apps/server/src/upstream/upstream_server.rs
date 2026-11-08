use crate::upstream::discovered_tool::DiscoveredTool;
use crate::upstream::open_upstream::open_upstream;
use indexmap::IndexMap;
use serde_json::{Map, Value};
use std::cell::RefCell;
use std::rc::Rc;
use usemcpkit_execution::CallContext;
use usemcpkit_manifest::Manifest;
use usemcpkit_upstream::{UpstreamConnection, UpstreamError};

/// A catalog server backed by another MCP server. It keeps the connection between calls, so a stdio upstream is
/// started once; a connection that closed is replaced before the call. A failed call is never sent again, since it may
/// already have run, except once on a new connection when the kept one was turned away unrun: its credentials stopped
/// working (401, which signs in or asks again) or the upstream ended its session (404).
pub struct UpstreamServer {
    /// By catalog name.
    pub tools: IndexMap<String, DiscoveredTool>,
    manifest: Manifest,
    calls: CallContext,
    kept: RefCell<Option<Rc<UpstreamConnection>>>,
}

impl UpstreamServer {
    pub fn new(manifest: Manifest, tools: Vec<DiscoveredTool>, calls: CallContext) -> Self {
        UpstreamServer {
            tools: tools.into_iter().map(|tool| (tool.name.clone(), tool)).collect(),
            manifest,
            calls,
            kept: RefCell::new(None),
        }
    }

    /// The upstream's own result, as it answered.
    pub async fn call(&self, tool: &DiscoveredTool, args: Option<&Map<String, Value>>) -> Result<Value, UpstreamError> {
        let open = self.kept.borrow().clone().filter(|connection| connection.is_open());
        if let Some(connection) = open {
            match connection.call_tool(&tool.upstream_name, args.cloned()).await {
                Err(error) if error.is_refused_before_running() => self.close().await,
                result => return result,
            }
        }
        let (name, args) = (tool.upstream_name.clone(), args.cloned());
        let (connection, result) = open_upstream(&self.manifest, &self.calls, move |connection| {
            let (name, args) = (name.clone(), args.clone());
            Box::pin(async move {
                match connection.call_tool(&name, args).await {
                    Err(UpstreamError::Unauthorized(reason)) => Err(UpstreamError::Unauthorized(reason)),
                    result => Ok(result),
                }
            })
        })
        .await?;
        *self.kept.borrow_mut() = Some(connection);
        result
    }

    /// Ends the kept connection, which stops a stdio upstream's process.
    pub async fn close(&self) {
        let kept = self.kept.borrow_mut().take();
        if let Some(connection) = kept {
            connection.close().await;
        }
    }
}
