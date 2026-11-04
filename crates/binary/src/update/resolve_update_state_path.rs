use crate::consts::UPDATE_STATE_FILE_NAME;
use std::path::{Path, PathBuf};

pub fn resolve_update_state_path(home_dir: &Path) -> PathBuf {
    home_dir.join(UPDATE_STATE_FILE_NAME)
}
