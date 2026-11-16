use serde::{Deserialize, Serialize};
use usemcpkit_manifest::tool::ToolSpec;

/// `<source>@<version>.json` next to the downloaded document: the tools built from it.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct BuiltToolsCache {
    /// The sha256 of the manifest the tools were built with; another manifest builds them again.
    pub manifest_sha256: String,
    pub spec_url: String,
    pub built_at: String,
    pub tools: Vec<ToolSpec>,
    /// The endpoints that could not become tools, with why.
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub skipped: Vec<String>,
}
