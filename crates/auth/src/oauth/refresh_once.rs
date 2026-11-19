use crate::oauth::refresh_stored_token::refresh_stored_token;
use crate::token_store::StoredToken;
use crate::{AuthContext, AuthError, ServerKey};
use futures_util::FutureExt;
use usemcpkit_core::LocalFuture;
use usemcpkit_manifest::auth::OAuthAuth;

/// Joins the refresh already running for the server, or starts one that every caller until it ends shares.
pub async fn refresh_once(
    server: &ServerKey,
    auth: &OAuthAuth,
    token: &StoredToken,
    context: &AuthContext,
) -> Result<StoredToken, AuthError> {
    let key = server.to_string();
    let running = context.state.pending_refreshes.borrow().get(&key).cloned();
    let pending = match running {
        Some(pending) => pending,
        None => {
            let (owned_key, server, auth, token, owned_context) = (
                key.clone(),
                server.clone(),
                auth.clone(),
                token.clone(),
                context.clone(),
            );
            let refresh: LocalFuture<'static, _> = Box::pin(async move {
                let refreshed = refresh_stored_token(&server, &auth, &token, &owned_context).await;
                owned_context.state.pending_refreshes.borrow_mut().remove(&owned_key);
                refreshed
            });
            let pending = refresh.shared();
            context
                .state
                .pending_refreshes
                .borrow_mut()
                .insert(key, pending.clone());
            pending
        }
    };
    pending.await
}
