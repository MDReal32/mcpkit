use serde::{Deserialize, Serialize};

/// What `hosts.json` keeps for one host: the source matching it and the version it runs.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HostRecord {
    pub source: String,
    /// The version the server answered, or the one its env var sets; absent for a source without versions.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub version: Option<String>,
    /// The version of the document the tools were built from: `version`, or the nearest older one published.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub spec_version: Option<String>,
    /// When the version was last asked, as an RFC 3339 time in UTC with milliseconds.
    pub checked_at: String,
}
