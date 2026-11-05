use crate::credentials::{CredentialExchange, CredentialRequest, CredentialRequester};
use crate::{AuthContext, AuthError};
use futures_util::FutureExt;
use std::rc::Rc;
use usemcpkit_core::LocalFuture;

/// One form per server at a time: calls that arrive while it is open share it, and only the call that opens it awaits
/// `create_request`.
pub async fn request_credentials_once(
    server_name: &str,
    create_request: LocalFuture<'static, Result<CredentialRequest, AuthError>>,
    context: &AuthContext,
    requester: &CredentialRequester,
) -> Result<CredentialExchange, AuthError> {
    let running = context
        .state
        .pending_credential_requests
        .borrow()
        .get(server_name)
        .cloned();
    let pending = match running {
        Some(pending) => pending,
        None => {
            let (key, state, requester) = (server_name.to_owned(), Rc::clone(&context.state), Rc::clone(requester));
            let exchanging: LocalFuture<'static, _> = Box::pin(async move {
                let exchanged = async {
                    let request = create_request.await?;
                    let response = requester(request.clone()).await?;
                    Ok(CredentialExchange { request, response })
                }
                .await;
                state.pending_credential_requests.borrow_mut().remove(&key);
                exchanged
            });
            let pending = exchanging.shared();
            context
                .state
                .pending_credential_requests
                .borrow_mut()
                .insert(server_name.to_owned(), pending.clone());
            pending
        }
    };
    pending.await
}
