/// What the sign-in needs from an authorization server's metadata (RFC 8414).
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct AuthorizationServerMetadata {
    pub issuer: String,
    pub authorization_endpoint: String,
    pub token_endpoint: String,
    pub registration_endpoint: Option<String>,
}
