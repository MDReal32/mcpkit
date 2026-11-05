use crate::tool::ToolSpec;
use serde::{Deserialize, Serialize};

/// One part of a shell manifest: the tools of one group.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct PartFile {
    pub tools: Vec<ToolSpec>,
}
