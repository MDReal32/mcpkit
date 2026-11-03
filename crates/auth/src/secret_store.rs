use crate::{AuthError, SecretOwner};
use mcpkit_core::LocalFuture;

/// Where credentials and domains entered in the credentials form are kept, per server, host and key.
pub trait SecretStore {
    fn get<'a>(&'a self, owner: &'a SecretOwner, key: &'a str) -> LocalFuture<'a, Result<Option<String>, AuthError>>;

    fn set<'a>(
        &'a self,
        owner: &'a SecretOwner,
        key: &'a str,
        value: &'a str,
    ) -> LocalFuture<'a, Result<(), AuthError>>;
}
