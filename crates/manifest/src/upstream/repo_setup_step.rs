use serde::{Deserialize, Serialize};

/// One program run inside the clone after checkout, such as an install or a build; no shell.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct RepoSetupStep {
    /// A program name on PATH, never a path.
    pub command: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub args: Option<Vec<String>>,
}
