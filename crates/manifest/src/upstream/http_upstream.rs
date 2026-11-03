use crate::upstream::UpstreamNameRule;
use serde::{Deserialize, Serialize};

/// An MCP server reached over Streamable HTTP; the manifest's `auth` signs the requests.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct HttpUpstream {
    /// May contain `{domain}`.
    pub url: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub naming: Option<Vec<UpstreamNameRule>>,
}
