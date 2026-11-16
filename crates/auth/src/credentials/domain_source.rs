use serde::{Deserialize, Serialize};

/// One OpenAPI source of the server, so the page can tell which one a typed host belongs to.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DomainSource {
    pub name: String,
    pub label: String,
    /// Host suffixes; absent, the source matches any host.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub hosts: Option<Vec<String>>,
    /// Whether the server can be asked its version, which the Check button does.
    pub versioned: bool,
}
