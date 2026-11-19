use crate::oauth::sign_in_once;
use crate::{AuthContext, AuthError, ResolvedAuth, ServerKey};
use indexmap::IndexMap;
use usemcpkit_manifest::auth::OAuthAuth;

/// Runs the browser sign-in for one OAuth2 entry and saves the token in the config.
pub async fn resolve_signed_in_auth(
    server: &ServerKey,
    auth: &OAuthAuth,
    context: &AuthContext,
) -> Result<ResolvedAuth, AuthError> {
    let Some(on_authorization_url) = &context.on_authorization_url else {
        return Err(AuthError(format!(
            "{}: sign-in needs a browser, which this caller does not provide",
            server.name
        )));
    };
    let signed_in = sign_in_once(server, auth, context, on_authorization_url).await?;
    Ok(ResolvedAuth {
        headers: IndexMap::from([(
            "Authorization".to_owned(),
            format!("Bearer {}", signed_in.token.access_token),
        )]),
        query: IndexMap::new(),
    })
}
