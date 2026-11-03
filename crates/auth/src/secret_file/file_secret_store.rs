use crate::config::{load_config, read_server_config, update_server_config};
use crate::json::object_entry;
use crate::{AuthError, SecretOwner, SecretStore};
use mcpkit_core::LocalFuture;
use serde_json::Value;
use std::path::PathBuf;

/// Plain text in the config file under the mcpkit home, by server and host, read on every call so all running servers
/// see each other's saves.
pub struct FileSecretStore {
    home: PathBuf,
}

impl FileSecretStore {
    pub fn new(home: PathBuf) -> Self {
        FileSecretStore { home }
    }
}

impl SecretStore for FileSecretStore {
    fn get<'a>(&'a self, owner: &'a SecretOwner, key: &'a str) -> LocalFuture<'a, Result<Option<String>, AuthError>> {
        Box::pin(async move {
            let config = load_config(&self.home).await?;
            let secret = read_server_config(&config, &owner.server)
                .and_then(|server| server.get("hosts")?.get(owner.host_key())?.get("secrets")?.get(key))
                .and_then(Value::as_str)
                .map(str::to_owned);
            Ok(secret)
        })
    }

    fn set<'a>(
        &'a self,
        owner: &'a SecretOwner,
        key: &'a str,
        value: &'a str,
    ) -> LocalFuture<'a, Result<(), AuthError>> {
        Box::pin(async move {
            update_server_config(&self.home, &owner.server, |current| {
                let host = object_entry(object_entry(current, "hosts"), owner.host_key());
                object_entry(host, "secrets").insert(key.to_owned(), Value::String(value.to_owned()));
            })
            .await?;
            Ok(())
        })
    }
}
