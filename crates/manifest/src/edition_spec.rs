use serde::{Deserialize, Serialize};

/// A deployment of the same API that needs other requests, for example Atlassian Cloud next to Data Center.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct EditionSpec {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub label: Option<String>,
    /// Host suffixes such as `.atlassian.net`; a domain whose host ends with one of them uses this edition.
    pub hosts: Vec<String>,
}
