use crate::consts::{FORM_CLOSE_TIMEOUT, FORM_HOST};
use crate::server::form_session::FormSession;
use crate::server::serve_form_connection::serve_form_connection;
use serde_json::Value;
use std::sync::Arc;
use tokio::net::TcpListener;
use tokio::sync::oneshot;
use tokio::task::JoinSet;
use usemcpkit_auth::AuthError;
use usemcpkit_auth::credentials::CredentialRequest;
use usemcpkit_auth::oauth::create_random_token;
use usemcpkit_core::env::Env;

/// Serves the form on a free loopback port until the page answers or is cancelled. Each connection runs on its own
/// task, so a slow CLI import never holds up the page.
pub struct FormServer {
    listener: TcpListener,
    connections: JoinSet<()>,
    session: Arc<FormSession>,
    answer: oneshot::Receiver<Result<Value, AuthError>>,
    /// The page, its session token in the fragment so it never reaches a server log.
    pub url: String,
}

impl FormServer {
    pub async fn start(request: CredentialRequest, page: String, env: Env) -> Result<Self, AuthError> {
        let listener = TcpListener::bind((FORM_HOST, 0))
            .await
            .map_err(|error| AuthError(format!("cannot listen on {FORM_HOST}: {error}")))?;
        let address = listener
            .local_addr()
            .map_err(|error| AuthError(format!("credentials form server has no TCP address: {error}")))?;
        let host = format!("{FORM_HOST}:{}", address.port());
        let token = create_random_token()?;
        let url = format!("http://{host}/#{token}");
        let (sender, answer) = oneshot::channel();
        Ok(FormServer {
            listener,
            connections: JoinSet::new(),
            session: Arc::new(FormSession::new(request, page, token, host, env, sender)),
            answer,
            url,
        })
    }

    /// The first valid answer, or the error of a cancel.
    pub async fn wait_for_answer(&mut self) -> Result<Value, AuthError> {
        let accepting = async {
            loop {
                let (stream, _) = self
                    .listener
                    .accept()
                    .await
                    .map_err(|error| AuthError(format!("credentials form server stopped: {error}")))?;
                self.connections
                    .spawn(serve_form_connection(stream, Arc::clone(&self.session)));
            }
        };
        tokio::select! {
            answer = &mut self.answer => answer
                .map_err(|_| AuthError::new("credentials form server stopped before an answer"))?,
            stopped = accepting => stopped,
        }
    }

    /// Stops listening and gives the open connections a moment to send their last response.
    pub async fn close(mut self) {
        drop(self.listener);
        let finishing = async { while self.connections.join_next().await.is_some() {} };
        if tokio::time::timeout(FORM_CLOSE_TIMEOUT, finishing).await.is_err() {
            self.connections.abort_all();
        }
    }
}
