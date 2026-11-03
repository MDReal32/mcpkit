use std::fmt;

/// A request that got no response: the connection failed, timed out or the body could not be read.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct HttpError(pub String);

impl fmt::Display for HttpError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(&self.0)
    }
}

impl std::error::Error for HttpError {}
