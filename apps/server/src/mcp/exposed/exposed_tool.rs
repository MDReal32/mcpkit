use crate::mcp::annotations::ToolAnnotations;
use serde_json::{Map, Value};

/// One catalog tool as the client sees it: its own MCP tool, with its schema.
#[derive(Clone, Debug, PartialEq)]
pub struct ExposedTool {
    /// The MCP tool name; the client's permission rules match on it.
    pub name: String,
    pub server_id: String,
    /// The tool name without the server id, such as `issues:issues:get_issue`.
    pub tool: String,
    pub description: String,
    pub input_schema: Map<String, Value>,
    pub annotations: Option<ToolAnnotations>,
}
