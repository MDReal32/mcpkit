use crate::openapi::OpenApiSource;
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};

/// Tools built on the user's machine from an OpenAPI (or Swagger 2.0) document, for the version the user's server runs.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct OpenApiSpec {
    /// One document per deployment; the first whose `hosts` match the domain is used, one without `hosts` matches any.
    pub sources: Vec<OpenApiSource>,
    /// Ordered `"regex": "template"` rules over `"METHOD /path"` (`GET /repos/{owner}/{repo}/branches`) that name the
    /// tools, `$1…` being the captures; an endpoint no rule matches gets a name made from its path.
    #[serde(default, skip_serializing_if = "IndexMap::is_empty")]
    pub naming: IndexMap<String, String>,
}
