use serde_json::Value;

/// What a tool call answered: a registry tool's mapped value (none when its mapping found nothing), or the MCP result
/// an upstream server sent as is.
pub enum ToolOutcome {
    Json(Option<Value>),
    Mcp(Value),
}
