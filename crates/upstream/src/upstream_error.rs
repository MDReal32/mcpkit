use std::fmt;

/// Why talking to an upstream failed; the message is shown to the model as it is.
#[derive(Clone, Debug, PartialEq, Eq)]
pub enum UpstreamError {
    Failed(String),
    /// The HTTP upstream refused the credentials (401), so the next auth option may be tried.
    Unauthorized(String),
}

impl UpstreamError {
    pub fn new(message: impl Into<String>) -> Self {
        UpstreamError::Failed(message.into())
    }

    pub fn message(&self) -> &str {
        match self {
            UpstreamError::Failed(message) | UpstreamError::Unauthorized(message) => message,
        }
    }
}

impl fmt::Display for UpstreamError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(self.message())
    }
}

impl std::error::Error for UpstreamError {}
