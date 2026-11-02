use crate::cli::consts::SERVER_BINARY_NAME;
use std::path::PathBuf;

/// The server binary sits next to the runner, so installing or updating one folder keeps the pair together.
pub fn resolve_server_binary(explicit: Option<PathBuf>) -> std::io::Result<PathBuf> {
    if let Some(path) = explicit {
        return Ok(path);
    }
    let runner = std::env::current_exe()?;
    let name = format!("{SERVER_BINARY_NAME}{}", std::env::consts::EXE_SUFFIX);
    Ok(runner.with_file_name(name))
}
