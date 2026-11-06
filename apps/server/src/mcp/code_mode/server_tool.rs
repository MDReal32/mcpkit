use crate::mcp::code_mode::tool_descriptor::ToolDescriptor;
use crate::mcp::tools::create_tool_id;
use serde_json::{Value, json};

/// A tool together with the server it belongs to.
pub struct ServerTool {
    pub server_id: String,
    pub descriptor: ToolDescriptor,
}

impl ServerTool {
    /// The tool as `codemode.tools` hands it to the code: `{ id, description, inputSchema }`.
    pub fn into_json(self) -> Value {
        json!({
            "id": create_tool_id(&self.server_id, &self.descriptor.tool),
            "description": self.descriptor.description,
            "inputSchema": self.descriptor.input_schema,
        })
    }
}
