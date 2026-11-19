use crate::config::update_config::update_config;
use crate::consts::SERVERS_KEY;
use crate::json::object_entry;
use crate::{AuthError, ServerKey};
use serde_json::{Map, Value};
use std::path::{Path, PathBuf};

/// Read-modify-write of one server's entry under `CONFIG_LOCK`; every other key of the file is kept.
pub async fn update_server_config(
    home: &Path,
    server: &ServerKey,
    change: impl FnOnce(&mut Map<String, Value>),
) -> Result<PathBuf, AuthError> {
    update_config(home, |config| {
        let servers = object_entry(config, SERVERS_KEY);
        change(object_entry(object_entry(servers, &server.category), &server.name));
    })
    .await
}
