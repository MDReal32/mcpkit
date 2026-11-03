use crate::auth::ClientAuthentication;
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};

/// OAuth 2.0 authorization code flow with PKCE; the browser sign-in starts on the first tool call without a stored token.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct OAuthAuth {
    pub authorization_url: String,
    pub token_url: String,
    pub client_id: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub client_secret_env: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub scopes: Option<Vec<String>>,
    /// Loopback port for the redirect URI; 0 picks a free port.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub redirect_port: Option<u16>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub authorization_params: Option<IndexMap<String, String>>,
    /// The form body when absent; with `basic` an absent secret is sent empty.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub client_authentication: Option<ClientAuthentication>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub token_headers: Option<IndexMap<String, String>>,
}
