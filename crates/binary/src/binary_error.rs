use std::fmt;

/// Why installing, updating or scheduling the binaries failed; the text is shown as it is.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct BinaryError(pub String);

impl fmt::Display for BinaryError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(&self.0)
    }
}

impl std::error::Error for BinaryError {}
