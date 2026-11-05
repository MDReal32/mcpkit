use crate::AuthError;
use crate::oauth::consts::RANDOM_TOKEN_BYTES;
use base64::Engine;
use base64::engine::general_purpose::URL_SAFE_NO_PAD;

/// 32 random bytes as unpadded base64url, like Node's `randomBytes(32).toString("base64url")`.
pub fn create_random_token() -> Result<String, AuthError> {
    let mut bytes = [0u8; RANDOM_TOKEN_BYTES];
    getrandom::fill(&mut bytes).map_err(|error| AuthError(format!("cannot read random bytes: {error}")))?;
    Ok(URL_SAFE_NO_PAD.encode(bytes))
}
