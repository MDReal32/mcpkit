use crate::oauth::sign_in::authorization_url_handler::AuthorizationUrlHandler;
use crate::oauth::sign_in::sign_in::sign_in;
use crate::oauth::sign_in::sign_in_result::SignInResult;
use crate::resolve::to_auth_key;
use crate::{AuthContext, AuthError};
use futures_util::FutureExt;
use mcpkit_core::LocalFuture;
use mcpkit_manifest::auth::OAuthAuth;

/// Joins the sign-in already running for the server and auth entry, or starts one that every caller until it ends
/// shares, so concurrent calls open one browser page.
pub async fn sign_in_once(
    server_name: &str,
    auth: &OAuthAuth,
    context: &AuthContext,
    on_authorization_url: &AuthorizationUrlHandler,
) -> Result<SignInResult, AuthError> {
    let key = format!("{server_name} {}", to_auth_key(auth));
    let running = context.state.pending_sign_ins.borrow().get(&key).cloned();
    let pending = match running {
        Some(pending) => pending,
        None => {
            let (owned_key, name, auth, owned_context, handler) = (
                key.clone(),
                server_name.to_owned(),
                auth.clone(),
                context.clone(),
                on_authorization_url.clone(),
            );
            let signing_in: LocalFuture<'static, _> = Box::pin(async move {
                let signed_in = sign_in(&name, &auth, &owned_context, handler.as_ref()).await;
                owned_context.state.pending_sign_ins.borrow_mut().remove(&owned_key);
                signed_in
            });
            let pending = signing_in.shared();
            context.state.pending_sign_ins.borrow_mut().insert(key, pending.clone());
            pending
        }
    };
    pending.await
}
