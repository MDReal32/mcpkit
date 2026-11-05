use crate::consts::TOKENS_FILE_NAME;
use std::path::{Path, PathBuf};

pub fn tokens_file(home: &Path) -> PathBuf {
    home.join(TOKENS_FILE_NAME)
}
