use crate::mcp::exposed::ToolExposure;
use mcpkit_registry::Fetch;
use serde_json::{Value, json};

pub fn list_tools<F: Fetch>(exposure: &ToolExposure<F>) -> Value {
    let tools: Vec<Value> = exposure.list().iter().map(|entry| entry.to_listed()).collect();
    json!({ "tools": tools })
}
