use crate::mcp::consts::TOOL_ID_SEPARATOR;

pub fn create_tool_id(server_id: &str, tool: &str) -> String {
    format!("{server_id}{TOOL_ID_SEPARATOR}{tool}")
}
