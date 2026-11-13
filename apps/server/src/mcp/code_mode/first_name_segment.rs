use crate::mcp::consts::TOOL_ID_SEPARATOR;

/// The group of a tool named `<group>:<resource>:<action>`.
pub fn first_name_segment(tool: &str) -> String {
    tool.split(TOOL_ID_SEPARATOR).next().unwrap_or_default().to_owned()
}
