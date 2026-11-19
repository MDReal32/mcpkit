use crate::AuthError;
use crate::config::config_files::{config_file, legacy_clients_file, legacy_tokens_file};
use crate::config::config_migrations::CONFIG_VERSION;
use crate::files::{parse_json_file, read_text_if_exists};
use std::path::Path;
use usemcpkit_core::migrations::read_version;

/// True when the config file is not at the current version or an old tokens or OAuth clients file is still there.
pub async fn needs_migration(home: &Path) -> Result<bool, AuthError> {
    for legacy in [legacy_tokens_file(home), legacy_clients_file(home)] {
        if read_text_if_exists(&legacy).await?.is_some() {
            return Ok(true);
        }
    }
    let file = config_file(home);
    let Some(text) = read_text_if_exists(&file).await? else {
        return Ok(false);
    };
    let version = read_version(&parse_json_file(&file, &text)?);
    Ok(version.as_f64() != Some(CONFIG_VERSION as f64))
}
