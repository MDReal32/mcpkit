use crate::AuthError;
use crate::config::config_files::{config_file, legacy_clients_file, legacy_tokens_file};
use crate::config::fold_legacy_files::{fold_legacy_clients, fold_legacy_tokens};
use crate::config::needs_migration::needs_migration;
use crate::config::read_config::read_config;
use crate::config::write_config::write_config;
use crate::files::{parse_json_file, read_text_if_exists};
use serde_json::{Map, Value};
use std::path::Path;

/// Reads an old file that is an object, `None` when it is not there; a malformed one fails instead of being dropped.
async fn read_legacy_object(file: &Path) -> Result<Option<Map<String, Value>>, AuthError> {
    let Some(text) = read_text_if_exists(file).await? else {
        return Ok(None);
    };
    match parse_json_file(file, &text)? {
        Value::Object(object) => Ok(Some(object)),
        _ => Err(AuthError(format!(
            "{} is not a valid usemcpkit state file",
            file.display()
        ))),
    }
}

async fn remove_legacy_file(file: &Path) -> Result<(), AuthError> {
    tokio::fs::remove_file(file)
        .await
        .map_err(|error| AuthError(format!("Cannot remove {}: {error}", file.display())))
}

/// Folds the old `tokens.json` and `oauth-clients.json` into the config, then removes them. Call it while holding
/// `CONFIG_LOCK`.
pub async fn migrate_config(home: &Path) -> Result<(), AuthError> {
    if !needs_migration(home).await? {
        return Ok(());
    }
    let file = config_file(home);
    let (tokens_file, clients_file) = (legacy_tokens_file(home), legacy_clients_file(home));
    let tokens = read_legacy_object(&tokens_file).await?;
    let clients = read_legacy_object(&clients_file).await?;
    let mut config = read_config(&file).await?;
    if let Some(tokens) = &tokens {
        config = fold_legacy_tokens(config, tokens);
    }
    if let Some(clients) = &clients {
        config = fold_legacy_clients(config, clients);
    }
    write_config(&file, config).await?;
    if tokens.is_some() {
        remove_legacy_file(&tokens_file).await?;
    }
    if clients.is_some() {
        remove_legacy_file(&clients_file).await?;
    }
    Ok(())
}
