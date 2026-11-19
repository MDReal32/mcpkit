use crate::AuthError;
use crate::config::config_files::config_file;
use crate::config::config_lock::CONFIG_LOCK;
use crate::config::migrate_config::migrate_config;
use crate::config::read_config::read_config;
use crate::config::write_config::write_config;
use serde_json::{Map, Value};
use std::path::{Path, PathBuf};

/// Read-modify-write of the whole config under `CONFIG_LOCK`; every key `change` leaves alone is kept.
pub async fn update_config(home: &Path, change: impl FnOnce(&mut Map<String, Value>)) -> Result<PathBuf, AuthError> {
    let _lock = CONFIG_LOCK.lock().await;
    migrate_config(home).await?;
    let file = config_file(home);
    let mut config = read_config(&file).await?;
    change(&mut config);
    write_config(&file, config).await?;
    Ok(file)
}
