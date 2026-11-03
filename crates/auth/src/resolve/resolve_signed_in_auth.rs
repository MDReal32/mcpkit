use crate::oauth::sign_in_once;
use crate::{AuthContext, AuthError, ResolvedAuth};
use indexmap::IndexMap;
use mcpkit_manifest::auth::OAuthAuth;

/// Runs the browser sign-in for one OAuth2 entry and stores the token in `tokens.json`.
pub async fn resolve_signed_in_auth(
    server_name: &str,
    auth: &OAuthAuth,
    context: &AuthContext,
) -> Result<ResolvedAuth, AuthError> {
    let Some(on_authorization_url) = &context.on_authorization_url else {
        return Err(AuthError(format!(
            "{server_name}: sign-in needs a browser, which this caller does not provide"
        )));
    };
    let signed_in = sign_in_once(server_name, auth, context, on_authorization_url).await?;
    Ok(ResolvedAuth {
        headers: IndexMap::from([(
            "Authorization".to_owned(),
            format!("Bearer {}", signed_in.token.access_token),
        )]),
        query: IndexMap::new(),
    })
}
