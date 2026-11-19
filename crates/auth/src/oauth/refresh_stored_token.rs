use crate::oauth::discovery::resolve_oauth_endpoints;
use crate::oauth::request_token::request_token;
use crate::token_store::{StoredToken, save_token};
use crate::{AuthContext, AuthError, ServerKey};
use usemcpkit_manifest::auth::OAuthAuth;

/// Providers may omit `refresh_token` on refresh; the previous one then stays valid.
pub async fn refresh_stored_token(
    server: &ServerKey,
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
            "{}: the stored session expired and has no refresh token",
            server.name
        )));
    };
    let grant = [("grant_type", "refresh_token"), ("refresh_token", refresh_token)];
    let auth = resolve_oauth_endpoints(&server.name, auth, None, context).await?;
    let fresh = request_token(&auth, &grant, &server.name, context).await?;
    let refreshed = StoredToken {
        refresh_token: fresh.refresh_token.or_else(|| token.refresh_token.clone()),
        auth_key: token.auth_key.clone(),
        ..fresh
    };
    save_token(&context.home, server, &refreshed).await?;
    Ok(refreshed)
}
