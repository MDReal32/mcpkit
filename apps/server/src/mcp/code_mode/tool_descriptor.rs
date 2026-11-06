use serde_json::{Map, Value};

/// One tool of a group as its manifest describes it.
pub struct ToolDescriptor {
    pub tool: String,
    pub description: String,
    pub input_schema: Map<String, Value>,
}
