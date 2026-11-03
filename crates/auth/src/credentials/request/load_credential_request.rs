use crate::config::{list_known_hosts, load_config, read_server_config};
use crate::credentials::CredentialRequest;
use crate::credentials::request::build_credential_request;
use crate::{AuthContext, AuthError, ServerKey};
use mcpkit_manifest::Manifest;
use std::rc::Rc;

/// The form of a server's auth options, with the hosts it was used on to choose from.
pub async fn load_credential_request(
    manifest: Rc<Manifest>,
    domain: Option<String>,
    context: AuthContext,
) -> Result<CredentialRequest, AuthError> {
    let config = load_config(&context.home).await?;
    let known_hosts = list_known_hosts(read_server_config(&config, &ServerKey::of(&manifest)));
    Ok(build_credential_request(
        &manifest,
        domain.as_deref(),
        known_hosts,
        &context.env,
    ))
}
