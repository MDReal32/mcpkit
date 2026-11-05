use crate::project::consts::{GIT_COMMAND_TIMEOUT, GIT_PROGRAM};
use std::path::Path;
use std::process::Stdio;
use tokio::process::Command;

/// Trimmed stdout of a git command in `cwd`; `None` when git is missing, `cwd` is not a repository, there is no such
/// setting or git takes too long, since each of those only means the project has nothing to tell.
pub async fn read_git_output(cwd: &Path, args: &[&str]) -> Option<String> {
    let mut command = Command::new(GIT_PROGRAM);
    command
        .args(args)
        .current_dir(cwd)
        .stdin(Stdio::null())
        .stderr(Stdio::null())
        .kill_on_drop(true);
    let output = tokio::time::timeout(GIT_COMMAND_TIMEOUT, command.output())
        .await
        .ok()?
        .ok()?;
    if !output.status.success() {
        return None;
    }
    let stdout = String::from_utf8_lossy(&output.stdout).trim().to_owned();
    (!stdout.is_empty()).then_some(stdout)
}
