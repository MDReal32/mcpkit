use crate::{AuthContext, AuthError, ResolvedAuth};
use mcpkit_manifest::auth::OAuthAuth;

/// The browser sign-in for one OAuth2 entry. No caller shows an authorization URL yet, so it always answers like the
/// TypeScript executor does for a caller without `onAuthorizationUrl`.
pub async fn resolve_signed_in_auth(
    server_name: &str,
    _auth: &OAuthAuth,
    _context: &AuthContext,
) -> Result<ResolvedAuth, AuthError> {
    Err(AuthError(format!(
        "{server_name}: sign-in needs a browser, which this caller does not provide"
    )))
}
