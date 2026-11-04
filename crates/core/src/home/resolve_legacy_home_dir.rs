use crate::env::Env;
use crate::home::consts::{HOME_ENV, LEGACY_HOME_DIR_NAME};
use std::path::PathBuf;

/// `~/.mcpkit`, where an older release kept its files, or `None` when `USEMCPKIT_HOME` picks the home folder, since a
/// chosen folder never adopts another one.
pub fn resolve_legacy_home_dir(env: &Env) -> Option<PathBuf> {
    if env.get(HOME_ENV).is_some() {
        return None;
    }
    std::env::home_dir().map(|home| home.join(LEGACY_HOME_DIR_NAME))
}
