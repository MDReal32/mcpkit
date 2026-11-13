use serde::{Deserialize, Serialize};

/// A JSON listing of the published versions, for example GitHub's folder listing or jsDelivr's npm versions.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct VersionList {
    pub url: String,
    /// Dotted path to the array (or object, whose keys are read) in the answer; the answer itself when absent.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub items: Option<String>,
    /// Field of each item when the items are objects, for example `name`.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub field: Option<String>,
    /// Regex whose first capture is the version, for example `^ghes-(\d+\.\d+)$`; items it does not match are skipped.
    #[serde(rename = "match")]
    pub pattern: String,
}
