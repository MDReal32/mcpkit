use crate::config::config_files::config_file;
use crate::config::config_lock::CONFIG_LOCK;
use crate::config::migrate_config::migrate_config;
use crate::config::read_config::read_config;
use crate::files::write_json_file;
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
    let _lock = CONFIG_LOCK.lock().await;
    migrate_config(home).await?;
    let file = config_file(home);
    let mut config = read_config(&file).await?;
    let servers = object_entry(&mut config, "servers");
    change(object_entry(object_entry(servers, &server.category), &server.name));
    write_json_file(&file, &Value::Object(config)).await?;
    Ok(file)
}
