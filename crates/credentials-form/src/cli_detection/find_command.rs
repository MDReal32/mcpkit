use crate::cli_detection::is_executable_file::is_executable_file;
use crate::consts::WINDOWS_DEFAULT_PATH_EXTENSIONS;
use mcpkit_auth::AuthError;
use mcpkit_core::env::Env;
use std::path::PathBuf;

/// The file a program name resolves to on the `PATH` of `env`, trying the `PATHEXT` extensions on Windows; the token
/// import runs exactly this file, so a button is shown only for a program that can run.
pub async fn find_command(command: &str, env: &Env) -> Result<Option<PathBuf>, AuthError> {
    let path = env.get("PATH").unwrap_or_default();
    let extensions: Vec<String> = match cfg!(windows) {
        true => std::iter::once(String::new())
            .chain(
                env.get("PATHEXT")
                    .unwrap_or(WINDOWS_DEFAULT_PATH_EXTENSIONS)
                    .split(';')
                    .map(str::to_owned),
            )
            .collect(),
        false => vec![String::new()],
    };
    for directory in std::env::split_paths(path).filter(|directory| !directory.as_os_str().is_empty()) {
        for extension in &extensions {
            let candidate = directory.join(format!("{command}{extension}"));
            let found = is_executable_file(&candidate)
                .await
                .map_err(|error| AuthError(format!("cannot look up \"{command}\" on PATH: {error}")))?;
            if found {
                return Ok(Some(candidate));
            }
        }
    }
    Ok(None)
}
