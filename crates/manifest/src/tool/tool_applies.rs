use serde::{Deserialize, Serialize};

/// Where a hand-written tool of an OpenAPI manifest applies; it replaces the built tool of the same name there.
#[derive(Clone, Debug, Default, PartialEq, Deserialize, Serialize)]
pub struct ToolApplies {
    /// Names of the OpenAPI sources; every source when absent.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub sources: Option<Vec<String>>,
    /// The first version it applies to.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub from: Option<String>,
    /// The first version it no longer applies to.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub below: Option<String>,
}
