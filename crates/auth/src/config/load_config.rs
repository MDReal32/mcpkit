use crate::AuthError;
use crate::config::config_files::config_file;
use crate::config::config_lock::CONFIG_LOCK;
use crate::config::migrate_config::migrate_config;
use crate::config::needs_migration::needs_migration;
use crate::config::read_config::read_config;
use serde_json::{Map, Value};
use std::path::Path;

/// Reads the config, first migrating an older file or an old `secrets.json` to the current version.
pub async fn load_config(home: &Path) -> Result<Map<String, Value>, AuthError> {
    if needs_migration(home).await? {
        let _lock = CONFIG_LOCK.lock().await;
        migrate_config(home).await?;
    }
    read_config(&config_file(home)).await
}
