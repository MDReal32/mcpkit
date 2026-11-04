use std::path::PathBuf;

/// The runner the client configs point at.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct LaunchBinary {
    pub path: PathBuf,
    pub update_hint: String,
    /// Homebrew or winget updates it, so mcpkit schedules nothing for it.
    pub managed: bool,
}
