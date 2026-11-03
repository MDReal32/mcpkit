use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct StoredToken {
    pub access_token: String,
    pub token_type: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub refresh_token: Option<String>,
    /// Epoch milliseconds, a float when the TypeScript CLI wrote it; absent when the provider issues non-expiring
    /// tokens.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub expires_at: Option<f64>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub scope: Option<String>,
    /// Identifies the manifest auth entry that issued the token, so it is refreshed against the same endpoint.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub auth_key: Option<String>,
}
