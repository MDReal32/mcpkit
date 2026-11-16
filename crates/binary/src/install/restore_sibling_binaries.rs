use crate::binary_context::BinaryContext;
use crate::binary_error::BinaryError;
use crate::install::sibling_server_path::sibling_server_path;
use crate::install::sibling_window_path::sibling_window_path;
use crate::install::write_binary_file::write_binary_file;
use crate::release::{download_release_binaries, fetch_target_release};
use std::path::PathBuf;

/// Downloads the server and the credentials window of the running runner's own `version` and writes them next to the
/// runner, the window first, and returns the server path. An updater from before the server was split out replaces
/// only the runner, which then finds no server beside it.
pub async fn restore_sibling_binaries(context: &BinaryContext, version: &str) -> Result<PathBuf, BinaryError> {
    let release = fetch_target_release(context, version).await?;
    let binaries = download_release_binaries(&release, context.target, context.http.as_ref()).await?;
    write_binary_file(
        &sibling_window_path(&context.exec_path, context.target),
        &binaries.window,
    )?;
    let path = sibling_server_path(&context.exec_path, context.target);
    write_binary_file(&path, &binaries.server)?;
    Ok(path)
}
