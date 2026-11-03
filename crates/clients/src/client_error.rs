use std::fmt;

/// Why a client config could not be read or written; the text names the file.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ClientError(pub String);

impl fmt::Display for ClientError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(&self.0)
    }
}

impl std::error::Error for ClientError {}
