use crate::oauth::discovery::client_registration::ClientRegistration;
use crate::oauth::discovery::discover_authorization_server::discover_authorization_server;
use crate::oauth::discovery::read_client_registration::read_client_registration;
use crate::oauth::discovery::register_client::register_client;
use crate::oauth::discovery::save_client_registration::save_client_registration;
use crate::{AuthContext, AuthError};
use usemcpkit_manifest::auth::OAuthAuth;

async fn pick_client_id(
    server_name: &str,
    issuer: &str,
    registration_endpoint: Option<&str>,
    redirect_uri: Option<&str>,
    context: &AuthContext,
) -> Result<String, AuthError> {
    let saved = read_client_registration(&context.home, issuer).await?;
    let Some(redirect_uri) = redirect_uri else {
        return saved.map(|saved| saved.client_id).ok_or_else(|| {
            AuthError(format!(
                "{server_name}: no client is registered with {issuer} yet, sign in again"
            ))
        });
    };
    if let Some(saved) = saved.filter(|saved| saved.redirect_uri == redirect_uri) {
        return Ok(saved.client_id);
    }
    let Some(registration_endpoint) = registration_endpoint else {
        return Err(AuthError(format!(
            "{server_name}: {issuer} does not register clients by itself, so the manifest needs a clientId"
        )));
    };
    let registration: ClientRegistration =
        register_client(registration_endpoint, redirect_uri, server_name, context).await?;
    save_client_registration(&context.home, issuer, &registration).await?;
    Ok(registration.client_id)
}

/// The entry with the endpoints and client its `discovery` url leads to; an entry that names its endpoints is returned
/// as it is. `redirect_uri` is the loopback redirect of a sign-in about to start, which a new client is registered
/// for; a refresh passes none and reuses the client the sign-in registered.
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
        pick_client_id(
            server_name,
            &metadata.issuer,
            metadata.registration_endpoint.as_deref(),
            redirect_uri,
            context,
        )
        .await?
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
