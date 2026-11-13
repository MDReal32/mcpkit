use crate::endpoints::Parameter;
use serde_json::{Map, Value};

/// One method of one path of the document.
pub struct Endpoint<'a> {
    /// Lowercase, as the document keys it.
    pub method: &'static str,
    /// The path a request goes to below the server's base URL: the source's base path and the document's path. It names
    /// the tool, and `skip` and `downloadPaths` match it.
    pub path: String,
    pub operation: &'a Map<String, Value>,
    /// The path item's parameters and the operation's own, which override them.
    pub parameters: Vec<Parameter<'a>>,
}

impl Endpoint<'_> {
    /// `GET /repos/{owner}/{repo}/branches`, the text `skip` patterns match.
    pub fn subject(&self) -> String {
        format!("{} {}", self.method.to_ascii_uppercase(), self.path)
    }
}
