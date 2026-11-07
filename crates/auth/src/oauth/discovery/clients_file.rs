use crate::oauth::discovery::consts::CLIENTS_FILE_NAME;
use std::path::{Path, PathBuf};

pub fn clients_file(home: &Path) -> PathBuf {
    home.join(CLIENTS_FILE_NAME)
}
