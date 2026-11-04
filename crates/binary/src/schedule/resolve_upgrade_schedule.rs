use crate::schedule::consts::UPGRADE_LOG_FILE_NAME;
use crate::schedule::upgrade_schedule::UpgradeSchedule;
use std::path::Path;

pub fn resolve_upgrade_schedule(binary_path: &Path, home_dir: &Path) -> UpgradeSchedule {
    UpgradeSchedule {
        binary_path: binary_path.to_path_buf(),
        log_path: home_dir.join(UPGRADE_LOG_FILE_NAME),
    }
}
