use serde::{Deserialize, Serialize};

/// Where a hand-written tool or an auth entry of an OpenAPI manifest applies: a tool replaces the built tool of the
/// same name there, and the credentials form offers an auth entry only there.
#[derive(Clone, Debug, Default, PartialEq, Deserialize, Serialize)]
pub struct Applies {
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
