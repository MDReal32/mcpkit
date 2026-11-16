use serde::{Deserialize, Serialize};

/// A query parameter an entry sends besides its own, taken from its own credential.
#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct QueryParam {
    pub env: String,
    pub name: String,
}
