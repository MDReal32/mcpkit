use crate::upstream::discovered_tool::DiscoveredTool;
use serde::{Deserialize, Serialize};

/// `<dir>/upstream/<category>/<name>.json`, the same file the TypeScript CLI reads and writes.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ToolCache {
    /// When the tools were listed, as an RFC 3339 time in UTC with milliseconds.
    pub discovered_at: String,
    pub tools: Vec<DiscoveredTool>,
}
