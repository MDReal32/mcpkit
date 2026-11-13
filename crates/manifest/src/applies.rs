use crate::condition::VersionCondition;
use serde::{Deserialize, Serialize};

/// Where a hand-written tool or an auth entry of an OpenAPI manifest applies: a tool replaces the built tool of the
/// same name there, and the credentials form offers an auth entry only there.
#[derive(Clone, Debug, Default, PartialEq, Deserialize, Serialize)]
pub struct Applies {
    /// Names of the OpenAPI sources; every source when absent.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub sources: Option<Vec<String>>,
    /// The versions, as in `9.0 <= {version} < 10`; every version when absent.
    #[serde(rename = "if", default, skip_serializing_if = "Option::is_none")]
    pub condition: Option<VersionCondition>,
}
