use std::path::PathBuf;

/// The credentials window program, `usemcpkit-window`, which the release ships next to this server so that installing
/// or updating one folder keeps the set together.
pub fn find_window_app() -> Result<PathBuf, String> {
    let server = std::env::current_exe().map_err(|error| format!("cannot find the running server: {error}"))?;
    let program = server.with_file_name(format!("usemcpkit-window{}", std::env::consts::EXE_SUFFIX));
    match program.is_file() {
        true => Ok(program),
        false => Err(format!("{} is missing", program.display())),
    }
}
