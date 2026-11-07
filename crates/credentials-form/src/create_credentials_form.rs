use crate::cli_detection::keep_installed_cli_actions;
use crate::consts::FORM_TIMED_OUT_MESSAGE;
use crate::credentials_form_options::CredentialsFormOptions;
use crate::inject_credential_request::inject_credential_request;
use crate::server::FormServer;
use std::rc::Rc;
use usemcpkit_auth::AuthError;
use usemcpkit_auth::credentials::CredentialRequester;

/// The `request_credentials` hook that asks through a one-off loopback page, closed once it answers, is cancelled or
/// times out.
pub fn create_credentials_form(options: CredentialsFormOptions) -> CredentialRequester {
    Rc::new(move |request| {
        let options = options.clone();
        Box::pin(async move {
            let request = keep_installed_cli_actions(request, &options.env).await?;
            let page = inject_credential_request(&options.page, &request)?;
            let mut server = FormServer::start(request, page, options.env.clone()).await?;
            (options.on_url)(&server.url, server.request());
            let answer = tokio::time::timeout(options.timeout, server.wait_for_answer()).await;
            server.close().await;
            answer.unwrap_or_else(|_| Err(AuthError::new(FORM_TIMED_OUT_MESSAGE)))
        })
    })
}
