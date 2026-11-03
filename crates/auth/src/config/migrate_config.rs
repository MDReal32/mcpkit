use crate::AuthError;
use crate::config::config_files::{config_file, legacy_secrets_file};
use crate::config::needs_migration::needs_migration;
use crate::config::read_config::read_config;
use crate::files::{read_text_if_exists, write_json_file};
use crate::secret_file::{merge_legacy_secrets, read_stored_secrets};
use serde_json::Value;
use std::path::Path;

/// Writes the config in the current version and folds in the old `secrets.json`, then removes it. Call it while
/// holding `CONFIG_LOCK`.
pub async fn migrate_config(home: &Path) -> Result<(), AuthError> {
    if !needs_migration(home).await? {
        return Ok(());
    }
    let file = config_file(home);
    let legacy_file = legacy_secrets_file(home);
    let config = read_config(&file).await?;
    let legacy = match read_text_if_exists(&legacy_file).await? {
        Some(_) => Some(read_stored_secrets(&legacy_file).await?),
        None => None,
    };
    let migrated = match &legacy {
        Some(legacy) => merge_legacy_secrets(config, legacy),
        None => config,
    };
    write_json_file(&file, &Value::Object(migrated)).await?;
    if legacy.is_some() {
        tokio::fs::remove_file(&legacy_file)
            .await
            .map_err(|error| AuthError(format!("Cannot remove {}: {error}", legacy_file.display())))?;
    }
    Ok(())
}
