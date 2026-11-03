use crate::upstream::discovered_tool::DiscoveredTool;
use crate::upstream::open_upstream::open_upstream;
use indexmap::IndexMap;
use mcpkit_execution::CallContext;
use mcpkit_manifest::Manifest;
use mcpkit_upstream::{UpstreamConnection, UpstreamError};
use serde_json::{Map, Value};
use std::cell::RefCell;
use std::rc::Rc;

/// A catalog server backed by another MCP server. It keeps the connection between calls, so a stdio upstream is
/// started once; a connection that closed is replaced before the call, and a call that failed is never retried, since
/// it may already have run.
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
        let connection = match open {
            Some(connection) => connection,
            None => {
                let (connection, ()) =
                    open_upstream(&self.manifest, &self.calls, |_| Box::pin(async { Ok(()) })).await?;
                *self.kept.borrow_mut() = Some(Rc::clone(&connection));
                connection
            }
        };
        connection.call_tool(&tool.upstream_name, args.cloned()).await
    }

    /// Ends the kept connection, which stops a stdio upstream's process.
    pub async fn close(&self) {
        let kept = self.kept.borrow_mut().take();
        if let Some(connection) = kept {
            connection.close().await;
        }
    }
}
