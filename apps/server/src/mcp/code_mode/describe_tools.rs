use crate::mcp::code_mode::tool_descriptor::ToolDescriptor;
use usemcpkit_manifest::tool::ToolSpec;

pub fn describe_tools(tools: impl IntoIterator<Item = ToolSpec>) -> Vec<ToolDescriptor> {
    tools
        .into_iter()
        .map(|spec| ToolDescriptor {
            tool: spec.name,
            description: spec.description,
            input_schema: spec.input,
        })
        .collect()
}
