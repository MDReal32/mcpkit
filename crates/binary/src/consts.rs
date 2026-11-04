pub const BIN_DIR_NAME: &str = "bin";

pub const UPDATE_STATE_FILE_NAME: &str = "update-state.json";

pub const UPDATE_CHECK_INTERVAL_MS: u64 = 6 * 60 * 60_000;

pub const DEFAULT_NPM_REGISTRY: &str = "https://registry.npmjs.org";

pub const NPM_REGISTRY_ENV: &str = "USEMCPKIT_NPM_REGISTRY";

pub const LATEST_TAG: &str = "latest";

/// Abbreviated npm metadata: only dist-tags and per-version dist info.
pub const NPM_METADATA_ACCEPT: &str = "application/vnd.npm.install-v1+json";

pub const METADATA_TIMEOUT_MS: u64 = 30_000;

pub const DOWNLOAD_TIMEOUT_MS: u64 = 5 * 60_000;

#[cfg(unix)]
pub const EXECUTABLE_MODE: u32 = 0o755;

/// npm tarballs put every file under `package/`.
pub const TARBALL_ROOT: &str = "package";

#[cfg(windows)]
pub const REPLACED_BINARY_SUFFIX: &str = ".old";

pub const SUPPORTED_INTEGRITY_ALGORITHMS: &[&str] = &["sha512", "sha384", "sha256"];

pub const NOT_FOUND_STATUS: u16 = 404;

/// `<prefix>/Cellar/usemcpkit/<version>/bin/usemcpkit`; Homebrew links `<prefix>/bin/usemcpkit` to the current version.
pub const HOMEBREW_CELLAR_PATTERN: &str = r"^(?<prefix>.+)/Cellar/usemcpkit/[^/]+/bin/usemcpkit$";

pub const HOMEBREW_UPGRADE_COMMAND: &str = "brew upgrade usemcpkit";

/// `…\WinGet\Packages\<PackageIdentifier>_<source>\usemcpkit.exe`; winget names a portable binary after its command
/// (`usemcpkit`) and upgrades in place, so the folder stays the same.
pub const WINGET_PACKAGE_PATTERN: &str = r"(?i)\\WinGet\\Packages\\(?<id>[^\\_]+)_[^\\]+\\(?:use)?usemcpkit\.exe$";
