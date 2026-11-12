use crate::tool::{RequestSpec, ResponseSpec, ToolApplies, ToolEdition};
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};
use serde_json::{Map, Value};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct ToolSpec {
    pub name: String,
    pub description: String,
    /// The JSON schema of the arguments, an `object` schema handed to the client as the tool's `inputSchema`.
    pub input: Map<String, Value>,
    pub request: RequestSpec,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub response: Option<ResponseSpec>,
    /// Per-edition overrides, keyed by the manifest's `editions`.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub editions: Option<IndexMap<String, ToolEdition>>,
    /// In an OpenAPI manifest, the sources and versions this hand-written tool applies to.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub applies: Option<ToolApplies>,
}
