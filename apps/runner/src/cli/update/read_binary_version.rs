use crate::cli::consts::VERSION_TIMEOUT;
use crate::cli::update::parse_binary_version::parse_binary_version;
use std::path::Path;
use std::process::Stdio;
use tokio::process::Command;

/// Asks an usemcpkit binary for its version, since the installed file can be older than the running runner.
pub async fn read_binary_version(path: &Path) -> Result<String, String> {
    let mut command = Command::new(path);
    command
        .arg("--version")
        .stdin(Stdio::null())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .kill_on_drop(true);
    #[cfg(windows)]
    command.creation_flags(usemcpkit_core::program::CREATE_NO_WINDOW);
    let output = tokio::time::timeout(VERSION_TIMEOUT, command.output())
        .await
        .map_err(|_| {
            format!(
                "{} --version timed out after {}s",
                path.display(),
                VERSION_TIMEOUT.as_secs()
            )
        })?
        .map_err(|error| format!("cannot run {} --version: {error}", path.display()))?;
    if !output.status.success() {
        return Err(format!(
            "{} --version failed ({}): {}",
            path.display(),
            output.status,
            String::from_utf8_lossy(&output.stderr).trim()
        ));
    }
    let stdout = String::from_utf8_lossy(&output.stdout);
    parse_binary_version(&stdout)
        .map(str::to_owned)
        .ok_or_else(|| format!("{} --version printed no version", path.display()))
}
