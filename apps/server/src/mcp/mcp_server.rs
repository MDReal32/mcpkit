use crate::catalog::RegistryCatalog;
use crate::mcp::code_mode::{call_code_mode_tool, list_code_mode_tools};
use crate::mcp::consts::METHOD_NOT_FOUND;
use crate::mcp::handled_line::HandledLine;
use crate::mcp::methods::initialize;
use crate::mcp::rpc::{RpcError, RpcMessage, create_error_response, create_result_response, parse_rpc_message};
use serde_json::{Value, json};
use std::rc::Rc;
use usemcpkit_execution::CallContext;
use usemcpkit_registry::Fetch;

/// Maps one JSON-RPC line to its response: the client sees only `search` and `execute`, which run the model's code
/// over the catalog's servers.
pub struct McpServer<F> {
    catalog: Rc<RegistryCatalog<F>>,
    calls: CallContext,
}

impl<F: Fetch + 'static> McpServer<F> {
    /// `calls` is shared by every tool call of the process.
    pub fn new(catalog: RegistryCatalog<F>, calls: CallContext) -> Self {
        McpServer {
            catalog: Rc::new(catalog),
            calls,
        }
    }

    /// Stops what serving started, such as upstream server processes.
    pub async fn close(&self) {
        self.catalog.close().await;
    }

    pub async fn handle_line(&self, line: &str) -> HandledLine {
        if line.trim().is_empty() {
            return HandledLine { response: None };
        }
        let message = match parse_rpc_message(line) {
            Ok(message) => message,
            Err(error) => {
                return HandledLine {
                    response: Some(create_error_response(Value::Null, &error)),
                };
            }
        };
        let notification = message.id.is_none();
        let id = message.id.clone().unwrap_or(Value::Null);
        let response = match self.dispatch(&message).await {
            Ok(result) => create_result_response(id, result),
            Err(error) => create_error_response(id, &error),
        };
        HandledLine {
            response: (!notification).then_some(response),
        }
    }

    async fn dispatch(&self, message: &RpcMessage) -> Result<Value, RpcError> {
        let params = message.params.as_ref();
        match message.method.as_str() {
            "initialize" => Ok(initialize(params)),
            "ping" => Ok(json!({})),
            "tools/list" => Ok(list_code_mode_tools(&self.catalog.servers)),
            "tools/call" => call_code_mode_tool(&self.catalog, params, &self.calls).await,
            method => Err(RpcError::new(METHOD_NOT_FOUND, format!("method not found: {method}"))),
        }
    }
}
