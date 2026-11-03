use crate::resolve::to_auth_key::to_auth_key;
use crate::token_store::StoredToken;
use mcpkit_manifest::auth::OAuthAuth;

/// Tokens saved before `authKey` existed belong to the first OAuth2 entry.
pub fn find_token_auth<'a>(entries: &[&'a OAuthAuth], token: &StoredToken) -> Option<&'a OAuthAuth> {
    let Some(auth_key) = &token.auth_key else {
        return entries.first().copied();
    };
    entries.iter().copied().find(|entry| &to_auth_key(entry) == auth_key)
}
