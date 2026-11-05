use serde::{Deserialize, Serialize};

/// What is known about a finished clone, kept in its marker file. The field order is the one TypeScript writes.
#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RepoState {
    /// The repo spec the clone was prepared from, as `JSON.stringify` writes it; another spec means another clone.
    pub signature: String,
    /// The commit the ref resolved to at checkout; unknown for a clone made before it was recorded.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub commit: Option<String>,
    /// Epoch milliseconds when the clone was last built.
    pub updated_at: u64,
    /// Epoch milliseconds when the remote ref was last compared with `commit`.
    pub checked_at: u64,
}
