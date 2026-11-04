/// The single entry usemcpkit owns in every client config; it serves every server of the registry.
pub const ENTRY_NAME: &str = "usemcpkit";

pub const SERVE_ARGS: &[&str] = &["serve"];

pub const BACKUP_SUFFIX: &str = ".usemcpkit-backup";

pub const JSON_INDENT_SIZE: usize = 2;

#[cfg(unix)]
pub const NEW_CONFIG_FILE_MODE: u32 = 0o644;

/// The Microsoft Store (MSIX) build of Claude Desktop keeps its data, `claude_desktop_config.json` included, in
/// `%LOCALAPPDATA%\Claude-Data\<package family name, lowercased>` and leaves only a marker file in `%APPDATA%\Claude`.
pub const CLAUDE_DESKTOP_STORE_DATA_DIR: [&str; 2] = ["Claude-Data", "anthropicpbc.claude_fnn82j28hfe8t"];
