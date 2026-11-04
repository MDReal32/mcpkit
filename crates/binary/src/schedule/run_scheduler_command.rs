use crate::binary_error::BinaryError;
use crate::schedule::consts::SCHEDULER_COMMAND_TIMEOUT;
use crate::schedule::scheduler_command_result::SchedulerCommandResult;
use mcpkit_core::env::Env;
use mcpkit_core::program::find_program;
use std::io::ErrorKind;
use std::process::Stdio;
use tokio::io::AsyncWriteExt;
use tokio::process::Command;

/// Runs a scheduler tool (`crontab`, `launchctl`, `schtasks`) without a shell, `input` on its stdin; a non-zero exit
/// is returned, not an error.
pub async fn run_scheduler_command(
    command: &str,
    args: &[&str],
    input: Option<&str>,
    env: &Env,
) -> Result<SchedulerCommandResult, BinaryError> {
    let program = find_program(command, env)
        .map_err(|error| BinaryError(format!("cannot look up \"{command}\" on PATH: {error}")))?
        .ok_or_else(|| BinaryError(format!("\"{command}\" is not installed or not on PATH")))?;
    let mut running = Command::new(program);
    running
        .args(args)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .kill_on_drop(true);
    #[cfg(windows)]
    running.creation_flags(mcpkit_core::program::CREATE_NO_WINDOW);
    let mut child = running
        .spawn()
        .map_err(|error| BinaryError(format!("cannot run {command}: {error}")))?;
    let stdin = child.stdin.take();
    let finished = async move {
        if let Some(mut stdin) = stdin {
            match stdin.write_all(input.unwrap_or_default().as_bytes()).await {
                Err(error) if error.kind() != ErrorKind::BrokenPipe => return Err(error),
                _ => {}
            }
        }
        child.wait_with_output().await
    };
    let output = match tokio::time::timeout(SCHEDULER_COMMAND_TIMEOUT, finished).await {
        Ok(Ok(output)) => output,
        Ok(Err(error)) => return Err(BinaryError(format!("{command} failed: {error}"))),
        Err(_) => {
            return Err(BinaryError(format!(
                "{command} timed out after {}s",
                SCHEDULER_COMMAND_TIMEOUT.as_secs()
            )));
        }
    };
    Ok(SchedulerCommandResult {
        exit_code: output.status.code().unwrap_or(1),
        stdout: String::from_utf8_lossy(&output.stdout).into_owned(),
        stderr: String::from_utf8_lossy(&output.stderr).into_owned(),
    })
}
