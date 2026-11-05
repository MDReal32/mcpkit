use crate::oauth::request_token::request_token;
use crate::token_store::{StoredToken, save_token};
use crate::{AuthContext, AuthError};
use usemcpkit_manifest::auth::OAuthAuth;

/// Providers may omit `refresh_token` on refresh; the previous one then stays valid.
pub async fn refresh_stored_token(
    server_name: &str,
    auth: &OAuthAuth,
    token: &StoredToken,
    context: &AuthContext,
) -> Result<StoredToken, AuthError> {
    let Some(refresh_token) = token
        .refresh_token
        .as_deref()
        .filter(|refresh_token| !refresh_token.is_empty())
    else {
        return Err(AuthError(format!(
            "{server_name}: the stored session expired and has no refresh token"
        )));
    };
    let grant = [("grant_type", "refresh_token"), ("refresh_token", refresh_token)];
    let fresh = request_token(auth, &grant, server_name, context).await?;
    let refreshed = StoredToken {
        refresh_token: fresh.refresh_token.or_else(|| token.refresh_token.clone()),
        auth_key: token.auth_key.clone(),
        ..fresh
    };
    save_token(&context.home, server_name, &refreshed).await?;
    Ok(refreshed)
}
