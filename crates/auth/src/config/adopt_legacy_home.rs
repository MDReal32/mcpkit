use crate::AuthError;
use crate::consts::SAVED_FILE_NAMES;
use crate::files::{read_text_if_exists, write_private_text_file};
use std::path::Path;

/// Copies the files an older `mcpkit` release saved credentials in from `legacy_home` into `home`, once: only while
/// `home` has none of them yet, so what was saved since is never overwritten. The old folder is left as it is, for
/// a client that still runs the old binary. `true` when it copied anything.
pub async fn adopt_legacy_home(home: &Path, legacy_home: &Path) -> Result<bool, AuthError> {
    for name in SAVED_FILE_NAMES {
        let file = home.join(name);
        let exists = tokio::fs::try_exists(&file)
            .await
            .map_err(|error| AuthError(format!("Cannot read {}: {error}", file.display())))?;
        if exists {
            return Ok(false);
        }
    }
    let mut copied = false;
    for name in SAVED_FILE_NAMES {
        if let Some(text) = read_text_if_exists(&legacy_home.join(name)).await? {
            write_private_text_file(&home.join(name), &text).await?;
            copied = true;
        }
    }
    Ok(copied)
}
