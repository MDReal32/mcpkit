use serde::{Deserialize, Serialize};

/// Where the client id and secret travel on token requests.
#[derive(Clone, Copy, Debug, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum ClientAuthentication {
    Body,
    Basic,
}
