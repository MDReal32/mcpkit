use std::path::PathBuf;

/// What the scheduled job runs: `<binary_path> upgrade`, its output appended to `log_path`.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct UpgradeSchedule {
    pub binary_path: PathBuf,
    pub log_path: PathBuf,
}
