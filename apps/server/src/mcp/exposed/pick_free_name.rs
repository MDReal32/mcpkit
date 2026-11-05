use crate::mcp::exposed::create_tool_name::create_tool_name;
use std::collections::HashSet;

/// The name of `tool`, bumped to the next attempt while another entry holds it, and taken for this one.
pub fn pick_free_name(server_id: &str, tool: &str, taken: &mut HashSet<String>) -> String {
    let mut attempt = 0;
    let mut name = create_tool_name(server_id, tool, attempt);
    while taken.contains(&name) {
        attempt += 1;
        name = create_tool_name(server_id, tool, attempt);
    }
    taken.insert(name.clone());
    name
}
