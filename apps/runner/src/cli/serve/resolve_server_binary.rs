use std::path::PathBuf;
use usemcpkit_binary::platform::SERVER_BINARY_NAME;

/// The server binary sits next to the runner, so installing or updating one folder keeps the pair together.
pub fn resolve_server_binary() -> std::io::Result<PathBuf> {
    let runner = std::env::current_exe()?;
    let name = format!("{SERVER_BINARY_NAME}{}", std::env::consts::EXE_SUFFIX);
    Ok(runner.with_file_name(name))
}
