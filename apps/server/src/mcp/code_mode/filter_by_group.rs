use crate::mcp::code_mode::tool_descriptor::ToolDescriptor;
use crate::mcp::consts::TOOL_ID_SEPARATOR;

/// The tools whose name starts with `group`; every tool when no group is asked for.
pub fn filter_by_group(tools: Vec<ToolDescriptor>, group: Option<&str>) -> Vec<ToolDescriptor> {
    let Some(group) = group else {
        return tools;
    };
    tools
        .into_iter()
        .filter(|found| found.tool.split(TOOL_ID_SEPARATOR).next() == Some(group))
        .collect()
}
