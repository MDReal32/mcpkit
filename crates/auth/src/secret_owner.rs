use crate::ServerKey;
use crate::consts::DEFAULT_HOST_KEY;

/// The server, and the host of it, a stored secret belongs to.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct SecretOwner {
    pub server: ServerKey,
    pub domain: Option<String>,
}

impl SecretOwner {
    pub fn host_key(&self) -> &str {
        self.domain.as_deref().unwrap_or(DEFAULT_HOST_KEY)
    }
}
