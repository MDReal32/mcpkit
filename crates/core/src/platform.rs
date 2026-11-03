/// The operating system families mcpkit tells apart, as Node's `process.platform` is read across the TypeScript CLI:
/// `win32`, `darwin`, and everything else taken as Linux.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Platform {
    Windows,
    MacOs,
    Linux,
}

impl Platform {
    pub fn current() -> Self {
        if cfg!(windows) {
            return Platform::Windows;
        }
        if cfg!(target_os = "macos") {
            return Platform::MacOs;
        }
        Platform::Linux
    }
}
