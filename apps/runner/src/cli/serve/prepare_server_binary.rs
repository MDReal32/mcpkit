use crate::cli::consts::VERSION;
use crate::cli::serve::file_exists::file_exists;
use crate::cli::serve::resolve_server_binary::resolve_server_binary;
use crate::cli::serve::resolve_window_binary::resolve_window_binary;
use crate::cli::update::create_binary_context;
use std::path::PathBuf;
use usemcpkit_binary::{is_installed_binary, restore_sibling_binaries};

/// The server `--server` names, or the one next to this runner. An updater from before the server or the credentials
/// window was split out leaves them out; the runner `usemcpkit install` placed then downloads the missing ones of its
/// own version. Without a window the server still runs and opens its forms in the browser.
pub async fn prepare_server_binary(explicit: Option<PathBuf>) -> Result<PathBuf, String> {
    if let Some(path) = explicit {
        return Ok(path);
    }
    let path = resolve_server_binary().map_err(|error| format!("cannot find the running usemcpkit binary: {error}"))?;
    let window =
        resolve_window_binary().map_err(|error| format!("cannot find the running usemcpkit binary: {error}"))?;
    let server_exists = file_exists(&path)?;
    if server_exists && file_exists(&window)? {
        return Ok(path);
    }
    let context = create_binary_context()?;
    if !is_installed_binary(&context) {
        if server_exists {
            return Ok(path);
        }
        return Err(format!(
            "{} is missing; usemcpkit-servers must sit next to usemcpkit",
            path.display()
        ));
    }
    match restore_sibling_binaries(&context, VERSION).await {
        Ok(restored) => {
            eprintln!(
                "usemcpkit: downloaded what was missing next to {} of usemcpkit {VERSION}",
                restored.display()
            );
            Ok(restored)
        }
        Err(error) if server_exists => {
            eprintln!(
                "usemcpkit: {} is missing and could not be downloaded, so credentials forms open in the browser: {error}",
                window.display()
            );
            Ok(path)
        }
        Err(error) => Err(format!(
            "{} is missing and could not be downloaded: {error}",
            path.display()
        )),
    }
}
