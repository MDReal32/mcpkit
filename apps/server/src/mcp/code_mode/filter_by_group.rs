use crate::mcp::code_mode::first_name_segment::first_name_segment;
use crate::mcp::code_mode::tool_descriptor::ToolDescriptor;

/// The tools of `group` (see [`first_name_segment`]); every tool when no group is asked for.
pub fn filter_by_group(tools: Vec<ToolDescriptor>, group: Option<&str>) -> Vec<ToolDescriptor> {
    let Some(group) = group else {
        return tools;
    };
    tools
        .into_iter()
        .filter(|found| first_name_segment(&found.tool) == group)
        .collect()
}
