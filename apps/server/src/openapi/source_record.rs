use serde::{Deserialize, Serialize};

/// One source of a host in `hosts.json`: its name and the version the host runs.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SourceRecord {
    pub source: String,
    /// The version the server answered, or the one its env var sets; absent for a source without versions, and for one
    /// whose server did not have the probe path (a 404) and was served from its oldest document.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub version: Option<String>,
    /// The version of the document the tools were built from: `version`, or the nearest older one published; absent
    /// beside `version` when no document is published for it or an older one, and only hand-written tools are served.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub spec_version: Option<String>,
}
