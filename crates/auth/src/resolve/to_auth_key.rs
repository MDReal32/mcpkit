use usemcpkit_manifest::auth::OAuthAuth;

/// Names the OAuth2 entry a stored token was issued by.
pub fn to_auth_key(auth: &OAuthAuth) -> String {
    match &auth.discovery {
        Some(resource) => format!("oauth {resource}"),
        None => format!("oauth {}", auth.token_url),
    }
}
