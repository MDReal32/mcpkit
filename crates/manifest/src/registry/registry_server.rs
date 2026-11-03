use serde::{Deserialize, Serialize};

/// Fields in the order the TypeScript CLI writes them into the cached `index.json`.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct RegistryServer {
    /// `<category>:<name>`, for example `git:github`.
    pub id: String,
    pub version: String,
    /// Link to the manifest, absolute or relative to the registry URL.
    pub url: String,
    /// Hex SHA-256 of the manifest file, the integrity check and the staleness check of the cached copy.
    pub sha256: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    /// Set when the manifest fronts another MCP server: the tools are discovered from it.
    #[serde(default, skip_serializing_if = "std::ops::Not::not")]
    pub upstream: bool,
}
