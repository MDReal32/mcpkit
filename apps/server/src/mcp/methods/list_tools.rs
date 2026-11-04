use crate::mcp::exposed::ToolExposure;
use serde_json::{Value, json};
use usemcpkit_registry::Fetch;

pub fn list_tools<F: Fetch>(exposure: &ToolExposure<F>) -> Value {
    let tools: Vec<Value> = exposure.list().iter().map(|entry| entry.to_listed()).collect();
    json!({ "tools": tools })
}
