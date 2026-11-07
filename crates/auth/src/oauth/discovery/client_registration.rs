use serde::{Deserialize, Serialize};

/// The client an authorization server issued to usemcpkit, kept per issuer for the redirect it was registered with.
#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ClientRegistration {
    pub client_id: String,
    pub redirect_uri: String,
}
