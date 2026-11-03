use crate::upstream::RepoSetupStep;
use serde::{Deserialize, Serialize};

/// A git repository the upstream server is run from, cloned on first use into `~/.mcpkit/repos/<category>/<name>`.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct UpstreamRepo {
    pub url: String,
    /// A commit is pinned and never compared; a tag or branch is compared with the remote and rebuilt when it moved.
    #[serde(rename = "ref")]
    pub reference: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub setup: Option<Vec<RepoSetupStep>>,
}
