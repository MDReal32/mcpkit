use crate::oauth::refresh_stored_token::refresh_stored_token;
use crate::token_store::StoredToken;
use crate::{AuthContext, AuthError};
use futures_util::FutureExt;
use usemcpkit_core::LocalFuture;
use usemcpkit_manifest::auth::OAuthAuth;

/// Joins the refresh already running for the server, or starts one that every caller until it ends shares.
pub async fn refresh_once(
    server_name: &str,
    auth: &OAuthAuth,
    token: &StoredToken,
    context: &AuthContext,
) -> Result<StoredToken, AuthError> {
    let running = context.state.pending_refreshes.borrow().get(server_name).cloned();
    let pending = match running {
        Some(pending) => pending,
        None => {
            let (name, auth, token, owned_context) =
                (server_name.to_owned(), auth.clone(), token.clone(), context.clone());
            let refresh: LocalFuture<'static, _> = Box::pin(async move {
                let refreshed = refresh_stored_token(&name, &auth, &token, &owned_context).await;
                owned_context.state.pending_refreshes.borrow_mut().remove(&name);
                refreshed
            });
            let pending = refresh.shared();
            context
                .state
                .pending_refreshes
                .borrow_mut()
                .insert(server_name.to_owned(), pending.clone());
            pending
        }
    };
    pending.await
}
