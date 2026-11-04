use crate::binary_error::BinaryError;
use crate::schedule::consts::{LAUNCH_AGENT_LABEL, LAUNCH_AGENTS_DIR};
use std::path::PathBuf;

/// `~/Library/LaunchAgents/<label>.plist` in the user's own home, not the usemcpkit one.
pub fn resolve_launch_agent_path() -> Result<PathBuf, BinaryError> {
    let home = std::env::home_dir().ok_or_else(|| BinaryError("cannot find the home folder".to_owned()))?;
    Ok(LAUNCH_AGENTS_DIR
        .iter()
        .fold(home, |dir, segment| dir.join(segment))
        .join(format!("{LAUNCH_AGENT_LABEL}.plist")))
}
