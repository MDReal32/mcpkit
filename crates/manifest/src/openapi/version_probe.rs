use serde::{Deserialize, Serialize};

/// A GET to `path` of the server, with the user's credentials, whose JSON `field` holds the version.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct VersionProbe {
    pub path: String,
    /// Dotted path into the JSON answer, for example `installed_version`.
    pub field: String,
    /// Regex whose first capture is the version, for example `^(\d+\.\d+)` for `3.14.2`.
    #[serde(rename = "match")]
    pub pattern: String,
}
