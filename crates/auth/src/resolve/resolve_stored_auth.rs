use crate::oauth::read_fresh_access_token;
use crate::resolve::find_token_auth::find_token_auth;
use crate::token_store::read_stored_token;
use crate::{AuthContext, AuthError, ResolvedAuth};
use indexmap::IndexMap;
use mcpkit_manifest::auth::AuthSpec;

/// The server's token from `tokens.json`, refreshed against the OAuth2 entry that issued it.
pub async fn resolve_stored_auth(
    server_name: &str,
    auth: &[AuthSpec],
    context: &AuthContext,
) -> Result<ResolvedAuth, AuthError> {
    let Some(stored) = read_stored_token(&context.home, server_name).await? else {
        return Err(AuthError(format!("{server_name}: not signed in yet")));
    };
    let entries: Vec<_> = auth.iter().filter_map(AuthSpec::as_interactive).collect();
    let Some(issuer) = find_token_auth(&entries, &stored) else {
        return Err(AuthError(format!(
            "{server_name}: the stored token comes from an auth entry that is no longer in the manifest"
        )));
    };
    let access_token = read_fresh_access_token(server_name, issuer, &stored, context).await?;
    Ok(ResolvedAuth {
        headers: IndexMap::from([("Authorization".to_owned(), format!("Bearer {access_token}"))]),
        query: IndexMap::new(),
    })
}
