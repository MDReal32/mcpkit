use std::path::PathBuf;
use usemcpkit_binary::platform::WINDOW_BINARY_NAME;

/// The credentials window sits next to the runner and the server, where the server opens it from.
pub fn resolve_window_binary() -> std::io::Result<PathBuf> {
    let runner = std::env::current_exe()?;
    let name = format!("{WINDOW_BINARY_NAME}{}", std::env::consts::EXE_SUFFIX);
    Ok(runner.with_file_name(name))
}
