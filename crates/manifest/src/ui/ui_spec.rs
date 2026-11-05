use crate::ui::{UiAction, UiInputSpec};
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};

/// What the credentials page shows. On the manifest only `texts` applies (page-wide strings, keyed like core's
/// `UiTexts`); on an auth entry `inputs` (by env var name) and `actions` apply. Anything left out uses the default text.
#[derive(Clone, Debug, Default, PartialEq, Deserialize, Serialize)]
pub struct UiSpec {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub texts: Option<IndexMap<String, String>>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub inputs: Option<IndexMap<String, UiInputSpec>>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub actions: Option<Vec<UiAction>>,
}
