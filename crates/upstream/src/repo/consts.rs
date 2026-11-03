use std::time::Duration;

/// Written last into a finished clone, holding its `RepoState`.
pub const READY_MARKER_FILE_NAME: &str = ".mcpkit-ready";

pub const SETUP_TIMEOUT: Duration = Duration::from_secs(10 * 60);

pub const ERROR_TAIL_LINES: usize = 12;

pub const REPO_DIR_PLACEHOLDER: &str = "{repo}";

/// How long a clone at a branch or tag is used before its remote ref is compared again.
pub const REPO_CHECK_INTERVAL_MS: u64 = 5 * 60_000;

pub const REMOTE_CHECK_TIMEOUT: Duration = Duration::from_secs(15);
