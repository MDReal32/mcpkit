use crate::consts::{CONFIG_FILE_NAME, SECRETS_FILE_NAME};
use std::path::{Path, PathBuf};

pub fn config_file(home: &Path) -> PathBuf {
    home.join(CONFIG_FILE_NAME)
}

pub fn legacy_secrets_file(home: &Path) -> PathBuf {
    home.join(SECRETS_FILE_NAME)
}
