use crate::Applies;
use crate::auth::QueryParam;
use crate::ui::UiSpec;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct QueryAuth {
    pub env: String,
    pub name: String,
    /// More query parameters the same entry sends, each from its own credential (Trello wants a key and a token).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub extra: Option<Vec<QueryParam>>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub label: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub ui: Option<UiSpec>,
    /// In an OpenAPI manifest, the sources and versions the credentials form offers this entry for.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub applies: Option<Applies>,
}
