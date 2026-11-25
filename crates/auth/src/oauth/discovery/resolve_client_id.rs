use crate::oauth::discovery::authorization_server_metadata::AuthorizationServerMetadata;
use crate::oauth::discovery::consts::CLIENT_METADATA_URL;
use crate::oauth::discovery::read_client_registration::read_client_registration;
use crate::oauth::discovery::register_client::register_client;
use crate::oauth::discovery::save_client_registration::save_client_registration;
use crate::{AuthContext, AuthError};

/// The client id of a sign-in whose manifest names none: the client registered with the authorization server (RFC 7591)
/// for this loopback redirect, or, when the server registers nobody but takes client metadata documents, the url of
/// usemcpkit's own. `redirect_uri` is the loopback redirect of a sign-in about to start; a refresh passes none and
/// reuses the client the sign-in used.
pub async fn resolve_client_id(
    server_name: &str,
    metadata: &AuthorizationServerMetadata,
    redirect_uri: Option<&str>,
    context: &AuthContext,
) -> Result<String, AuthError> {
    let issuer = &metadata.issuer;
    let saved = read_client_registration(&context.home, issuer).await?;
    let Some(redirect_uri) = redirect_uri else {
        if let Some(saved) = saved {
            return Ok(saved.client_id);
        }
        if metadata.supports_client_id_metadata_document {
            return Ok(CLIENT_METADATA_URL.to_owned());
        }
        return Err(AuthError(format!(
            "{server_name}: no client is registered with {issuer} yet, sign in again"
        )));
    };
    if let Some(saved) = saved.filter(|saved| saved.redirect_uri == redirect_uri) {
        return Ok(saved.client_id);
    }
    if let Some(registration_endpoint) = &metadata.registration_endpoint {
        let registration = register_client(registration_endpoint, redirect_uri, server_name, context).await?;
        save_client_registration(&context.home, issuer, &registration).await?;
        return Ok(registration.client_id);
    }
    if metadata.supports_client_id_metadata_document {
        return Ok(CLIENT_METADATA_URL.to_owned());
    }
    Err(AuthError(format!(
        "{server_name}: {issuer} does not register clients by itself or take client metadata documents, so the manifest needs a clientId"
    )))
}
