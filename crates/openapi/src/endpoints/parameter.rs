use serde_json::Value;

/// One parameter of an endpoint, its reference already followed.
#[derive(Clone)]
pub struct Parameter<'a> {
    pub name: String,
    /// `path`, `query`, `header` or `cookie`.
    pub location: String,
    pub required: bool,
    pub description: Option<String>,
    pub schema: Option<&'a Value>,
    pub explode: Option<bool>,
}
