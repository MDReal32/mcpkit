use crate::ui::UiSpec;
use crate::upstream::{UpstreamNameRule, UpstreamRepo};
use serde::{Deserialize, Serialize};

/// An MCP server started as a child process and spoken to over its stdio.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct StdioUpstream {
    /// A program name on PATH, never a path.
    pub command: String,
    /// May contain `{repo}`, the folder of `repo`'s clone.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub args: Option<Vec<String>>,
    /// Credentials handed to the child as environment variables; a missing one is asked for in the credentials form.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub forward_env: Option<Vec<String>>,
    /// Handed to the child only when set; the upstream decides what a missing one means.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub optional_env: Option<Vec<String>>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub ui: Option<UiSpec>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub repo: Option<UpstreamRepo>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub naming: Option<Vec<UpstreamNameRule>>,
}
