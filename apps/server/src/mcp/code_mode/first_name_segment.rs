use crate::mcp::consts::{PATH_SEPARATOR, TOOL_ID_SEPARATOR};

/// The group of a tool: the first segment of a name `<group>:<resource>:<action>`, or the first path segment of an
/// endpoint's name `<path>:<method>` (`repos/{owner}/{repo}/branches:get` → `repos`).
pub fn first_name_segment(tool: &str) -> String {
    tool.split([TOOL_ID_SEPARATOR, PATH_SEPARATOR])
        .find(|segment| !segment.is_empty())
        .unwrap_or_default()
        .to_owned()
}
