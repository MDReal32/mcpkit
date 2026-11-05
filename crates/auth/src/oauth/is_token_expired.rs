use crate::oauth::consts::EXPIRY_SKEW_MS;
use crate::token_store::StoredToken;

pub fn is_token_expired(token: &StoredToken, now: f64) -> bool {
    token
        .expires_at
        .is_some_and(|expires_at| expires_at - EXPIRY_SKEW_MS <= now)
}
