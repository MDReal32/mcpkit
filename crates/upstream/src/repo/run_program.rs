use crate::repo::read_failure_output::read_failure_output;
use crate::transport::create_child_env;
use crate::upstream_error::UpstreamError;
use indexmap::IndexMap;
use std::path::Path;
use std::process::Stdio;
use std::time::Duration;
use tokio::process::Command;
use usemcpkit_core::env::Env;
use usemcpkit_core::program::find_program;

/// Runs one program without a shell in `cwd` and returns what it printed, trimmed. The environment is the minimal
/// inherited one, so a repository's install scripts never see the credentials the server will later be given; git
/// never prompts. A program still running after `timeout` is killed.
pub async fn run_program(
    command: &str,
    args: &[String],
    cwd: &Path,
    timeout: Duration,
    env: &Env,
) -> Result<String, UpstreamError> {
    let command_line = std::iter::once(command)
        .chain(args.iter().map(String::as_str))
        .collect::<Vec<_>>()
        .join(" ");
    let failed = |reason: String| UpstreamError::new(format!("{command_line} failed in {}: {reason}", cwd.display()));
    let child_env = create_child_env(
        env,
        &IndexMap::from([("GIT_TERMINAL_PROMPT".to_owned(), "0".to_owned())]),
    );
    let program = find_program(command, &Env::from_pairs(child_env.clone()))
        .map_err(|error| failed(format!("cannot look up \"{command}\" on PATH: {error}")))?
        .ok_or_else(|| failed(format!("\"{command}\" is not installed or not on PATH")))?;
    let mut running = Command::new(program);
    running
        .args(args)
        .current_dir(cwd)
        .env_clear()
        .envs(child_env)
        .stdin(Stdio::null())
        .kill_on_drop(true);
    #[cfg(windows)]
    running.creation_flags(usemcpkit_core::program::CREATE_NO_WINDOW);
    let output = match tokio::time::timeout(timeout, running.output()).await {
        Ok(Ok(output)) => output,
        Ok(Err(error)) => return Err(failed(error.to_string())),
        Err(_) => return Err(failed(format!("timed out after {}s", timeout.as_secs()))),
    };
    if !output.status.success() {
        let exit = match output.status.code() {
            Some(code) => format!("exited with code {code}"),
            None => "exited with code unknown".to_owned(),
        };
        return Err(failed(read_failure_output(&output.stderr, exit)));
    }
    Ok(String::from_utf8_lossy(&output.stdout).trim().to_owned())
}
