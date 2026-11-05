use serde::{Deserialize, Serialize};

/// Lets one server talk to any host of the same API, for example a self-hosted GitHub Enterprise.
#[derive(Clone, Debug, Default, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DomainSpec {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub label: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub hint: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub placeholder: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub default: Option<String>,
    /// Env var that sets the domain; when it is set the form does not ask for one.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub env: Option<String>,
    /// Picks the saved host the git remote of the working directory points at.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub match_git_remote: Option<bool>,
}
