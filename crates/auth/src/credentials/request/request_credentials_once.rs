use crate::config::{list_known_hosts, load_config, read_server_config};
use crate::credentials::request::build_credential_request;
use crate::credentials::{CredentialExchange, CredentialRequester};
use crate::{AuthContext, AuthError, ServerKey};
use futures_util::FutureExt;
use mcpkit_core::LocalFuture;
use mcpkit_manifest::Manifest;
use std::rc::Rc;

/// One form per server at a time: calls that arrive while it is open share it, and only the call that opens it builds
/// the request.
pub async fn request_credentials_once(
    manifest: &Rc<Manifest>,
    domain: Option<&str>,
    context: &AuthContext,
    requester: &CredentialRequester,
) -> Result<CredentialExchange, AuthError> {
    let key = manifest.name.clone();
    let running = context.state.pending_credential_requests.borrow().get(&key).cloned();
    let pending = match running {
        Some(pending) => pending,
        None => {
            let (owned_key, manifest, domain, owned_context, requester) = (
                key.clone(),
                Rc::clone(manifest),
                domain.map(str::to_owned),
                context.clone(),
                Rc::clone(requester),
            );
            let exchanging: LocalFuture<'static, _> = Box::pin(async move {
                let exchanged = async {
                    let config = load_config(&owned_context.home).await?;
                    let known_hosts = list_known_hosts(read_server_config(&config, &ServerKey::of(&manifest)));
                    let request =
                        build_credential_request(&manifest, domain.as_deref(), known_hosts, &owned_context.env);
                    let response = requester(request.clone()).await?;
                    Ok(CredentialExchange { request, response })
                }
                .await;
                owned_context
                    .state
                    .pending_credential_requests
                    .borrow_mut()
                    .remove(&owned_key);
                exchanged
            });
            let pending = exchanging.shared();
            context
                .state
                .pending_credential_requests
                .borrow_mut()
                .insert(key, pending.clone());
            pending
        }
    };
    pending.await
}
