use serde::{Deserialize, Serialize};

/// Renames the tools of an upstream server into mcpkit's `<group>:<resource>:<action>` form.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct UpstreamNameRule {
    /// A regular expression tested against the upstream tool name; the first rule that matches names the tool.
    #[serde(rename = "match")]
    pub pattern: String,
    /// The new name, with `$1`… for captures and `$&` for the whole upstream name.
    pub name: String,
}
