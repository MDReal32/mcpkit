use std::path::PathBuf;
use std::process::Stdio;
use tokio::process::Command;

/// `<program> window <url>`, with only stderr kept so a window that cannot open can say why.
pub fn form_window_command(program: PathBuf, url: &str) -> Command {
    let mut command = Command::new(program);
    command
        .args(["window", url])
        .stdin(Stdio::null())
        .stdout(Stdio::null())
        .stderr(Stdio::piped());
    #[cfg(windows)]
    command.creation_flags(crate::browser::consts::CREATE_NO_WINDOW);
    command
}
