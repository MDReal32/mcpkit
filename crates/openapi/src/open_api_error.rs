use std::fmt;

/// A document that cannot be read or turned into tools, or a manifest rule that does not apply.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct OpenApiError(pub String);

impl fmt::Display for OpenApiError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(&self.0)
    }
}

impl std::error::Error for OpenApiError {}
