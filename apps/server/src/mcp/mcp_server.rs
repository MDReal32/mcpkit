use crate::catalog::RegistryCatalog;
use crate::mcp::consts::METHOD_NOT_FOUND;
use crate::mcp::exposed::ToolExposure;
use crate::mcp::handled_line::HandledLine;
use crate::mcp::methods::{MethodOutcome, call_tool, initialize, list_tools};
use crate::mcp::rpc::{RpcError, RpcMessage, create_error_response, create_result_response, parse_rpc_message};
use mcpkit_registry::Fetch;
use mcpkit_wire_log::WireLog;
use serde_json::{Value, json};
use std::rc::Rc;

/// Maps one JSON-RPC line to its response, over the sections and tools the catalog exposes.
pub struct McpServer<F> {
    catalog: Rc<RegistryCatalog<F>>,
    exposure: ToolExposure<F>,
}

impl<F: Fetch> McpServer<F> {
    pub fn new(catalog: RegistryCatalog<F>, wire_log: Rc<WireLog>) -> Self {
        let catalog = Rc::new(catalog);
        McpServer {
            exposure: ToolExposure::new(Rc::clone(&catalog), wire_log),
            catalog,
        }
    }

    pub fn exposure(&self) -> &ToolExposure<F> {
        &self.exposure
    }

    pub async fn handle_line(&self, line: &str) -> HandledLine {
        if line.trim().is_empty() {
            return HandledLine {
                response: None,
                tools_changed: false,
            };
        }
        let message = match parse_rpc_message(line) {
            Ok(message) => message,
            Err(error) => {
                return HandledLine {
                    response: Some(create_error_response(Value::Null, &error)),
                    tools_changed: false,
                };
            }
        };
        let notification = message.id.is_none();
        let id = message.id.clone().unwrap_or(Value::Null);
        let (response, tools_changed) = match self.dispatch(&message).await {
            Ok(outcome) => (create_result_response(id, outcome.result), outcome.tools_changed),
            Err(error) => (create_error_response(id, &error), false),
        };
        HandledLine {
            response: (!notification).then_some(response),
            tools_changed,
        }
    }

    async fn dispatch(&self, message: &RpcMessage) -> Result<MethodOutcome, RpcError> {
        let params = message.params.as_ref();
        match message.method.as_str() {
            "initialize" => Ok(MethodOutcome::unchanged(initialize(params))),
            "ping" => Ok(MethodOutcome::unchanged(json!({}))),
            "tools/list" => Ok(MethodOutcome::unchanged(list_tools(&self.exposure))),
            "tools/call" => call_tool(&self.catalog, &self.exposure, params).await,
            method => Err(RpcError::new(METHOD_NOT_FOUND, format!("method not found: {method}"))),
        }
    }
}
