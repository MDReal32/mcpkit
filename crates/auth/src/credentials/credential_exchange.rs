use crate::credentials::CredentialRequest;
use serde_json::Value;

/// What the form asked and what the user answered, unchecked: every call that shares the form checks it itself.
#[derive(Clone, Debug, PartialEq)]
pub struct CredentialExchange {
    pub request: CredentialRequest,
    pub response: Value,
}
