use crate::AuthError;
use crate::oauth::pkce::create_random_token::create_random_token;
use crate::oauth::pkce::to_code_challenge::to_code_challenge;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct PkcePair {
    pub verifier: String,
    pub challenge: String,
}

impl PkcePair {
    /// RFC 7636 S256: the challenge is the base64url SHA-256 of the verifier.
    pub fn create() -> Result<Self, AuthError> {
        let verifier = create_random_token()?;
        let challenge = to_code_challenge(&verifier);
        Ok(PkcePair { verifier, challenge })
    }
}
