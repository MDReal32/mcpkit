use crate::tool::{RequestSpec, ResponseSpec};
use serde::{Deserialize, Serialize};

/// Replaces the tool's request, and its response mapping when given, for one edition.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct ToolEdition {
    pub request: RequestSpec,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub response: Option<ResponseSpec>,
}
