use serde::{Deserialize, Serialize};
use serde_json::{Map, Value};

/// One tool of an upstream server as the cache keeps it.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DiscoveredTool {
    /// The name in the catalog, worked out again from the manifest's naming rules whenever the cache is read.
    pub name: String,
    /// The name the upstream server knows it by.
    pub upstream_name: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub input_schema: Option<Map<String, Value>>,
}
