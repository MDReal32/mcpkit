use crate::consts::{CONFIG_FILE_NAME, LEGACY_CLIENTS_FILE_NAME, LEGACY_TOKENS_FILE_NAME};
use std::path::{Path, PathBuf};

pub fn config_file(home: &Path) -> PathBuf {
    home.join(CONFIG_FILE_NAME)
}

pub fn legacy_tokens_file(home: &Path) -> PathBuf {
    home.join(LEGACY_TOKENS_FILE_NAME)
}

pub fn legacy_clients_file(home: &Path) -> PathBuf {
    home.join(LEGACY_CLIENTS_FILE_NAME)
}
