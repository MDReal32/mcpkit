use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CacheEntry {
    /// Epoch milliseconds when the cached content last changed; for a file cached before the map existed, when it was first noted.
    pub updated_at: u64,
    /// Epoch milliseconds when the content was last written or confirmed current.
    pub checked_at: u64,
    /// Hex SHA-256 of the cached file.
    pub sha256: String,
    /// The registry folder the file was fetched from; only the index notes it, so a cache that another version or
    /// another `USEMCPKIT_REGISTRY` filled is synced again.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub registry: Option<String>,
}
