use indexmap::IndexMap;
use serde_json::{Map, Value};

/// The arguments a request body adds to a tool.
pub struct BodyArguments {
    /// Outgoing key → argument name.
    pub mapping: IndexMap<String, String>,
    pub properties: Map<String, Value>,
    pub required: Vec<String>,
    pub content_type: String,
    pub file_args: Vec<String>,
    /// Set when the body has no named properties: the argument sent unchanged as the whole body.
    pub whole_body: Option<String>,
}
