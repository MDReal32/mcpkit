use serde::{Deserialize, Serialize};

/// Overrides what the credentials page shows for one credential field.
#[derive(Clone, Debug, Default, PartialEq, Deserialize, Serialize)]
pub struct UiInputSpec {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub label: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub hint: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub placeholder: Option<String>,
    /// Whether the page masks what is typed; true when left out.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub secret: Option<bool>,
}
