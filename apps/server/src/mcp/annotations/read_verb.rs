use crate::mcp::annotations::consts::ACTION_WORD_SEPARATOR;
use crate::mcp::consts::TOOL_ID_SEPARATOR;

/// `issues:issues:get_issue` reads as `get`.
pub fn read_verb(tool: &str) -> &str {
    let action = tool.rsplit(TOOL_ID_SEPARATOR).next().unwrap_or_default();
    action.split(ACTION_WORD_SEPARATOR).next().unwrap_or_default()
}
