use crate::oauth::discovery::discover_authorization_server::discover_authorization_server;
use crate::oauth::discovery::resolve_client_id::resolve_client_id;
use crate::{AuthContext, AuthError};
use usemcpkit_manifest::auth::OAuthAuth;

/// The entry with the endpoints and client its `discovery` url leads to; an entry that names its endpoints is returned
/// as it is. `redirect_uri` is the loopback redirect of a sign-in about to start, which a new client is registered
/// for; a refresh passes none and reuses the client the sign-in used.
pub async fn resolve_oauth_endpoints(
    server_name: &str,
    auth: &OAuthAuth,
    redirect_uri: Option<&str>,
    context: &AuthContext,
) -> Result<OAuthAuth, AuthError> {
    let Some(resource) = &auth.discovery else {
        return Ok(auth.clone());
    };
    let metadata = discover_authorization_server(resource, server_name, context).await?;
    let client_id = if auth.client_id.is_empty() {
        resolve_client_id(server_name, &metadata, redirect_uri, context).await?
    } else {
        auth.client_id.clone()
    };
    Ok(OAuthAuth {
        authorization_url: metadata.authorization_endpoint,
        token_url: metadata.token_endpoint,
        client_id,
        ..auth.clone()
    })
}
