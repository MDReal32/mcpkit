use std::fmt;
use usemcpkit_auth::AuthError;

/// A call that cannot be made or that the API refused; the message is shown to the model as it is.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ToolError(pub String);

impl ToolError {
    pub fn new(message: impl Into<String>) -> Self {
        ToolError(message.into())
    }
}

impl fmt::Display for ToolError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(&self.0)
    }
}

impl std::error::Error for ToolError {}

impl From<AuthError> for ToolError {
    fn from(error: AuthError) -> Self {
        ToolError(error.0)
    }
}
