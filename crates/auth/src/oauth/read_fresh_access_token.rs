use crate::oauth::is_token_expired::is_token_expired;
use crate::oauth::now_epoch_ms::now_epoch_ms;
use crate::oauth::refresh_once::refresh_once;
use crate::token_store::StoredToken;
use crate::{AuthContext, AuthError};
use usemcpkit_manifest::auth::OAuthAuth;

pub async fn read_fresh_access_token(
    server_name: &str,
    auth: &OAuthAuth,
    stored: &StoredToken,
    context: &AuthContext,
) -> Result<String, AuthError> {
    if !is_token_expired(stored, now_epoch_ms()) {
        return Ok(stored.access_token.clone());
    }
    let refreshed = refresh_once(server_name, auth, stored, context).await?;
    Ok(refreshed.access_token)
}
