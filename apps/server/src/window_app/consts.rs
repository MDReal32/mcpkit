/// The credentials window, `usemcpkit-window` built by `apps/window` for this target; `build.rs` names the file.
pub const WINDOW_APP_BINARY: &[u8] = include_bytes!(env!("USEMCPKIT_WINDOW_BINARY"));

/// The folder of the usemcpkit home that holds the extracted window apps, one folder per build.
pub const WINDOW_APP_DIR: &str = "window";

pub const WINDOW_APP_FILE: &str = if cfg!(windows) {
    "usemcpkit-window.exe"
} else {
    "usemcpkit-window"
};

/// How many hex digits of the app's checksum name its folder.
pub const WINDOW_APP_FOLDER_HASH_LENGTH: usize = 12;

#[cfg(unix)]
pub const WINDOW_APP_FILE_MODE: u32 = 0o755;
