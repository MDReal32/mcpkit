use crate::mcp::code_mode::listed::Listed;
use crate::mcp::code_mode::tool_descriptor::ToolDescriptor;
use std::collections::HashSet;

/// The manifest's own tools followed by the upstream's. A tool of the upstream with the name of an own tool is left
/// out and reported: a call by that name runs the own tool.
pub fn merge_upstream_tools(
    server_id: &str,
    own: Vec<ToolDescriptor>,
    upstream: Vec<ToolDescriptor>,
) -> Listed<ToolDescriptor> {
    let own_names: HashSet<String> = own.iter().map(|found| found.tool.clone()).collect();
    let (hidden, kept): (Vec<ToolDescriptor>, Vec<ToolDescriptor>) =
        upstream.into_iter().partition(|found| own_names.contains(&found.tool));
    let mut merged = own;
    merged.extend(kept);
    if hidden.is_empty() {
        return Listed::new(merged);
    }
    let names: Vec<&str> = hidden.iter().map(|found| found.tool.as_str()).collect();
    let warning = format!(
        "{server_id}: the upstream tools {} share a name with a tool of the manifest and are left out",
        names.join(", ")
    );
    Listed::with_warning(merged, warning)
}
