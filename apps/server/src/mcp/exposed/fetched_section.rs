use crate::mcp::exposed::tool_descriptor::ToolDescriptor;

/// What opening a section found, before its entries get their names.
pub enum FetchedSection {
    Groups(Vec<String>),
    Tools(Vec<ToolDescriptor>),
}
