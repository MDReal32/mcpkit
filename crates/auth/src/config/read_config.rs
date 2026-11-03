use crate::AuthError;
use crate::config::config_migrations::{CONFIG_MIGRATIONS, CONFIG_VERSION};
use crate::config::is_mcpkit_config::is_mcpkit_config;
use crate::files::{parse_json_file, read_text_if_exists};
use mcpkit_core::migrations::migrate_data;
use serde_json::{Map, Value};
use std::path::Path;

/// A missing file means no settings; an older version is migrated in memory (writing happens on the next save); a
/// malformed file or one from a newer mcpkit fails instead of being overwritten.
pub async fn read_config(file: &Path) -> Result<Map<String, Value>, AuthError> {
    let Some(text) = read_text_if_exists(file).await? else {
        let mut empty = Map::new();
        empty.insert("version".to_owned(), Value::from(CONFIG_VERSION));
        return Ok(empty);
    };
    let migrated = migrate_data(parse_json_file(file, &text)?, CONFIG_MIGRATIONS)
        .map_err(|message| AuthError(format!("{} {message}", file.display())))?;
    if !is_mcpkit_config(&migrated) {
        return Err(AuthError(format!(
            "{} is not a valid mcpkit config file",
            file.display()
        )));
    }
    Ok(migrated)
}
