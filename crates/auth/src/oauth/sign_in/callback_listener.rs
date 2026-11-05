use crate::AuthError;
use crate::oauth::consts::{CALLBACK_CLOSE_TIMEOUT, CALLBACK_PATH, LOOPBACK_HOST};
use crate::oauth::sign_in::answer_callback::CallbackSender;
use crate::oauth::sign_in::callback_params::CallbackParams;
use crate::oauth::sign_in::serve_callback_connection::serve_callback_connection;
use std::sync::{Arc, Mutex};
use tokio::net::TcpListener;
use tokio::sync::oneshot;
use tokio::task::JoinSet;

/// The loopback redirect target (RFC 8252). Each browser connection is served on its own task and closed after one
/// response, so the callback page is sent before the sign-in goes on.
pub struct CallbackListener {
    listener: TcpListener,
    connections: JoinSet<()>,
    pub redirect_uri: String,
}

impl CallbackListener {
    /// Binds `127.0.0.1` on the port; 0 picks a free one, and the redirect URI names the port that was bound.
    pub async fn bind(port: u16) -> Result<Self, AuthError> {
        let listener = TcpListener::bind((LOOPBACK_HOST, port))
            .await
            .map_err(|error| AuthError(format!("cannot listen on {LOOPBACK_HOST}:{port}: {error}")))?;
        let address = listener
            .local_addr()
            .map_err(|error| AuthError(format!("callback server has no TCP address: {error}")))?;
        Ok(CallbackListener {
            listener,
            connections: JoinSet::new(),
            redirect_uri: format!("http://{LOOPBACK_HOST}:{}{CALLBACK_PATH}", address.port()),
        })
    }

    /// The query of the first request to the callback path.
    pub async fn wait_for_params(&mut self) -> Result<CallbackParams, AuthError> {
        let (sender, receiver) = oneshot::channel();
        let sender: CallbackSender = Arc::new(Mutex::new(Some(sender)));
        let accepting = async {
            loop {
                let (stream, _) = self
                    .listener
                    .accept()
                    .await
                    .map_err(|error| AuthError(format!("callback server stopped: {error}")))?;
                let sender = Arc::clone(&sender);
                self.connections.spawn(serve_callback_connection(stream, sender));
            }
        };
        tokio::select! {
            params = receiver => params.map_err(|_| AuthError::new("callback server stopped before the callback")),
            stopped = accepting => stopped,
        }
    }

    /// Lets the open connections finish their response, then drops them.
    pub async fn close(mut self) {
        let finishing = async { while self.connections.join_next().await.is_some() {} };
        if tokio::time::timeout(CALLBACK_CLOSE_TIMEOUT, finishing).await.is_err() {
            self.connections.abort_all();
        }
    }
}
