use crate::openapi::{VersionList, VersionProbe};
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};

/// How the version of the user's server is found and which published document belongs to it.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct SpecVersioning {
    pub probe: VersionProbe,
    /// Env var that pins the version instead of asking the server.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub env: Option<String>,
    /// Where the published versions are listed; without it (or `known`) only the exact version is tried.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub list: Option<VersionList>,
    /// Published versions by version, each with the text `{version}` is replaced by, for vendors without a listing.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub known: Option<IndexMap<String, String>>,
}
