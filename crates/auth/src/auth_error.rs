use std::fmt;

/// Credentials that are missing, rejected or cannot be read; the message is shown to the model as it is.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct AuthError(pub String);

impl AuthError {
    pub fn new(message: impl Into<String>) -> Self {
        AuthError(message.into())
    }
}

impl fmt::Display for AuthError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(&self.0)
    }
}

impl std::error::Error for AuthError {}
