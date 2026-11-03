use mcpkit_manifest::auth::OAuthAuth;

/// Names the OAuth2 entry a stored token was issued by.
pub fn to_auth_key(auth: &OAuthAuth) -> String {
    format!("oauth {}", auth.token_url)
}
