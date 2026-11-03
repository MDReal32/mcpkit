use crate::consts::FORM_CLOSED_MESSAGE;
use mcpkit_auth::AuthError;
use mcpkit_auth::credentials::CredentialRequest;
use mcpkit_core::env::Env;
use serde_json::Value;
use std::sync::Mutex;
use tokio::sync::oneshot;

pub type FormAnswerSender = oneshot::Sender<Result<Value, AuthError>>;

/// One open form: what it asks, the page that asks it, and who may talk to it. Only the first answer or cancel counts.
pub struct FormSession {
    pub request: CredentialRequest,
    pub page: String,
    /// The secret in the page URL's fragment, sent back on every API call.
    pub token: String,
    /// `127.0.0.1:<port>`, the only `Host` the server answers.
    pub host: String,
    /// Where a provider's CLI is looked up.
    pub env: Env,
    answer: Mutex<Option<FormAnswerSender>>,
}

impl FormSession {
    pub fn new(
        request: CredentialRequest,
        page: String,
        token: String,
        host: String,
        env: Env,
        answer: FormAnswerSender,
    ) -> Self {
        FormSession {
            request,
            page,
            token,
            host,
            env,
            answer: Mutex::new(Some(answer)),
        }
    }

    pub fn answer(&self, response: Value) {
        self.settle(Ok(response));
    }

    pub fn cancel(&self) {
        self.settle(Err(AuthError::new(FORM_CLOSED_MESSAGE)));
    }

    fn settle(&self, outcome: Result<Value, AuthError>) {
        let sender = self.answer.lock().map(|mut answer| answer.take());
        if let Ok(Some(sender)) = sender
            && sender.send(outcome).is_err()
        {
            eprintln!("mcpkit: the credentials form answered after its call gave up");
        }
    }
}
