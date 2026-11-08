use std::fmt;

/// Why talking to an upstream failed; the message is shown to the model as it is.
#[derive(Clone, Debug, PartialEq, Eq)]
pub enum UpstreamError {
    Failed(String),
    /// The HTTP upstream refused the credentials (401), so the next auth option may be tried.
    Unauthorized(String),
    /// The HTTP upstream answered 404 to a request of a session it ended, so a new session has to be started.
    SessionExpired(String),
}

impl UpstreamError {
    pub fn new(message: impl Into<String>) -> Self {
        UpstreamError::Failed(message.into())
    }

    pub fn message(&self) -> &str {
        match self {
            UpstreamError::Failed(message)
            | UpstreamError::Unauthorized(message)
            | UpstreamError::SessionExpired(message) => message,
        }
    }

    /// Whether the upstream turned the request away before running it, so a new connection may send it again.
    pub fn is_refused_before_running(&self) -> bool {
        matches!(self, UpstreamError::Unauthorized(_) | UpstreamError::SessionExpired(_))
    }
}

impl fmt::Display for UpstreamError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(self.message())
    }
}

impl std::error::Error for UpstreamError {}
