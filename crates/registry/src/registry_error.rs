use std::fmt;

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum RegistryError {
    /// A download differs from what the index lists, usually because the cached index is older than the registry.
    ChecksumMismatch(String),
    Failed(String),
}

impl RegistryError {
    pub fn failed(message: impl Into<String>) -> Self {
        RegistryError::Failed(message.into())
    }
}

impl fmt::Display for RegistryError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            RegistryError::ChecksumMismatch(message) | RegistryError::Failed(message) => formatter.write_str(message),
        }
    }
}

impl std::error::Error for RegistryError {}
