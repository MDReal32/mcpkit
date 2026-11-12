use crate::auth::AuthSpec;
use crate::upstream::UpstreamNameRule;
use serde::{Deserialize, Serialize};

/// An MCP server reached over Streamable HTTP; its own `auth` signs the requests, the manifest's when it has none.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct HttpUpstream {
    /// May contain `{domain}`.
    pub url: String,
    /// Tried like the manifest's `auth`; set when the manifest has tools of its own that sign in differently.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub auth: Option<Vec<AuthSpec>>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub naming: Option<Vec<UpstreamNameRule>>,
}
