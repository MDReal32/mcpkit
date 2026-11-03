use crate::upstream::{HttpUpstream, StdioUpstream, UpstreamNameRule};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(tag = "type", rename_all = "lowercase")]
pub enum UpstreamSpec {
    Http(HttpUpstream),
    Stdio(Box<StdioUpstream>),
}

impl UpstreamSpec {
    /// The rules that rename the upstream's tools into `<group>:<resource>:<action>`.
    pub fn naming(&self) -> Option<&[UpstreamNameRule]> {
        match self {
            UpstreamSpec::Http(http) => http.naming.as_deref(),
            UpstreamSpec::Stdio(stdio) => stdio.naming.as_deref(),
        }
    }
}
