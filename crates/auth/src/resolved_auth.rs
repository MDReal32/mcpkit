use indexmap::IndexMap;
use serde::{Deserialize, Serialize};

/// What an auth entry adds to a request.
#[derive(Clone, Debug, Default, PartialEq, Eq, Deserialize, Serialize)]
pub struct ResolvedAuth {
    pub headers: IndexMap<String, String>,
    pub query: IndexMap<String, String>,
}
