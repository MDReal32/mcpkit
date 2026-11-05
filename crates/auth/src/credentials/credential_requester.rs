use crate::AuthError;
use crate::credentials::CredentialRequest;
use serde_json::Value;
use std::rc::Rc;
use usemcpkit_core::LocalFuture;

/// Shows the credentials form and resolves with the user's answer as it came, or fails when the form is cancelled.
pub type CredentialRequester = Rc<dyn Fn(CredentialRequest) -> LocalFuture<'static, Result<Value, AuthError>>>;
