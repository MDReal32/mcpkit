use crate::binary_context::BinaryContext;
use crate::binary_error::BinaryError;
use crate::install::path_exists::path_exists;
use crate::install::sibling_server_path::sibling_server_path;
use crate::install::sibling_window_path::sibling_window_path;
use crate::install::write_binary_file::write_binary_file;
use crate::release::{download_release_binaries, fetch_target_release};
use std::path::PathBuf;

/// Downloads the release of the running runner's own `version` and writes the server and the credentials window next
/// to the runner where they are missing, the window first, and returns the server path. A sibling that is there is
/// left alone, so the runners already serving from it do not swap their server. An updater from before the server
/// was split out replaces only the runner, and one from before the window was split out the runner and the server.
pub async fn restore_sibling_binaries(context: &BinaryContext, version: &str) -> Result<PathBuf, BinaryError> {
    let window_path = sibling_window_path(&context.exec_path, context.target);
    let server_path = sibling_server_path(&context.exec_path, context.target);
    let window_missing = !path_exists(&window_path)?;
    let server_missing = !path_exists(&server_path)?;
    if !window_missing && !server_missing {
        return Ok(server_path);
    }
    let release = fetch_target_release(context, version).await?;
    let binaries = download_release_binaries(&release, context.target, context.http.as_ref()).await?;
    if window_missing {
        write_binary_file(&window_path, &binaries.window)?;
    }
    if server_missing {
        write_binary_file(&server_path, &binaries.server)?;
    }
    Ok(server_path)
}
