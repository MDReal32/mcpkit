use crate::consts::CLI_TOKEN_TIMEOUT;
use mcpkit_auth::ui::CliTokenCommand;
use mcpkit_core::env::Env;
use mcpkit_core::program::find_program;
use std::process::Stdio;
use tokio::process::Command;

/// Runs the provider's CLI without a shell, as the file `PATH` resolves it to, and returns the token it prints. A CLI
/// that fails gives its stderr as the reason; one that is still running after `CLI_TOKEN_TIMEOUT` is killed.
pub async fn read_cli_token(cli: &CliTokenCommand, env: &Env) -> Result<String, String> {
    let command = &cli.command;
    let failed = |reason: String| format!("{command}: {reason}");
    let Some(program) =
        find_program(command, env).map_err(|error| failed(format!("cannot look up \"{command}\" on PATH: {error}")))?
    else {
        return Err(failed(format!("\"{command}\" is not installed or not on PATH")));
    };
    let mut running = Command::new(program);
    running.args(&cli.args).stdin(Stdio::null()).kill_on_drop(true);
    #[cfg(windows)]
    running.creation_flags(mcpkit_core::program::CREATE_NO_WINDOW);
    let command_line = [command.as_str()]
        .into_iter()
        .chain(cli.args.iter().map(String::as_str))
        .collect::<Vec<_>>()
        .join(" ");
    let output = match tokio::time::timeout(CLI_TOKEN_TIMEOUT, running.output()).await {
        Ok(Ok(output)) => output,
        Ok(Err(error)) => return Err(failed(error.to_string())),
        Err(_) => return Err(failed(format!("Command timed out: {command_line}"))),
    };
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr).trim().to_owned();
        return match stderr.is_empty() {
            true => Err(failed(format!("Command failed: {command_line}"))),
            false => Err(failed(stderr)),
        };
    }
    let token = String::from_utf8_lossy(&output.stdout).trim().to_owned();
    if token.is_empty() {
        return Err(format!("{command} printed no token"));
    }
    Ok(token)
}
