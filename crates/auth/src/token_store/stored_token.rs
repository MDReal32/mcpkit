use crate::token_store::expires_at::{deserialize_expires_at, serialize_expires_at};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct StoredToken {
    pub access_token: String,
    pub token_type: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub refresh_token: Option<String>,
    /// Epoch milliseconds in memory; the file holds a UTC time. Absent when the provider issues non-expiring tokens.
    #[serde(
        default,
        skip_serializing_if = "Option::is_none",
        serialize_with = "serialize_expires_at",
        deserialize_with = "deserialize_expires_at"
    )]
    pub expires_at: Option<f64>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub scope: Option<String>,
    /// Identifies the manifest auth entry that issued the token, so it is refreshed against the same endpoint.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub auth_key: Option<String>,
}
