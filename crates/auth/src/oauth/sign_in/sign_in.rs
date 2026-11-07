use crate::oauth::consts::{DEFAULT_REDIRECT_PORT, SIGN_IN_TIMEOUT};
use crate::oauth::discovery::resolve_oauth_endpoints;
use crate::oauth::pkce::{AuthorizationRequest, PkcePair, build_authorization_url, create_random_token};
use crate::oauth::request_token::request_token;
use crate::oauth::sign_in::callback_listener::CallbackListener;
use crate::oauth::sign_in::read_authorization_code::read_authorization_code;
use crate::oauth::sign_in::sign_in_result::SignInResult;
use crate::resolve::to_auth_key;
use crate::token_store::{StoredToken, save_token};
use crate::{AuthContext, AuthError};
use usemcpkit_manifest::auth::OAuthAuth;

/// Runs the authorization code + PKCE flow through a loopback redirect and stores the token.
pub async fn sign_in(
    server_name: &str,
    auth: &OAuthAuth,
    context: &AuthContext,
    on_authorization_url: &dyn Fn(&str),
) -> Result<SignInResult, AuthError> {
    let pkce = PkcePair::create()?;
    let state = create_random_token()?;
    let default_port = if auth.discovery.is_some() {
        0
    } else {
        DEFAULT_REDIRECT_PORT
    };
    let mut listener = CallbackListener::bind(auth.redirect_port.unwrap_or(default_port)).await?;
    let signing_in = async {
        let redirect_uri = listener.redirect_uri.clone();
        let auth = &resolve_oauth_endpoints(server_name, auth, Some(&redirect_uri), context).await?;
        let request = AuthorizationRequest {
            redirect_uri: &redirect_uri,
            challenge: &pkce.challenge,
            state: &state,
        };
        on_authorization_url(&build_authorization_url(auth, &request)?);
        let params = tokio::time::timeout(SIGN_IN_TIMEOUT, listener.wait_for_params())
            .await
            .map_err(|_| AuthError(format!("{server_name}: sign-in timed out")))??;
        let code = read_authorization_code(&params, &state, server_name)?;
        let grant = [
            ("grant_type", "authorization_code"),
            ("code", code.as_str()),
            ("redirect_uri", redirect_uri.as_str()),
            ("code_verifier", pkce.verifier.as_str()),
        ];
        let exchanged = request_token(auth, &grant, server_name, context).await?;
        let token = StoredToken {
            auth_key: Some(to_auth_key(auth)),
            ..exchanged
        };
        let tokens_file = save_token(&context.home, server_name, &token).await?;
        Ok(SignInResult { token, tokens_file })
    };
    let result = signing_in.await;
    listener.close().await;
    result
}
