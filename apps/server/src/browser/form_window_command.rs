use std::path::Path;
use std::process::Stdio;
use tokio::process::Command;

/// `<program> <url>` with the request on its piped stdin and only stderr kept, so a window that cannot open can say
/// why.
pub fn form_window_command(program: &Path, url: &str) -> Command {
    let mut command = Command::new(program);
    command
        .arg(url)
        .stdin(Stdio::piped())
        .stdout(Stdio::null())
        .stderr(Stdio::piped());
    #[cfg(windows)]
    command.creation_flags(usemcpkit_core::program::CREATE_NO_WINDOW);
    command
}
