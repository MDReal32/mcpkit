use crate::upstream::{HttpUpstream, StdioUpstream};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(tag = "type", rename_all = "lowercase")]
pub enum UpstreamSpec {
    Http(HttpUpstream),
    Stdio(Box<StdioUpstream>),
}
