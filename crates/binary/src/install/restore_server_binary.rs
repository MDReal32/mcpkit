use crate::binary_context::BinaryContext;
use crate::binary_error::BinaryError;
use crate::install::sibling_server_path::sibling_server_path;
use crate::install::write_binary_file::write_binary_file;
use crate::release::{download_release_binaries, fetch_target_release};
use std::path::PathBuf;

/// Downloads the server of the running runner's own `version` and writes it next to the runner. An updater from before
/// the server was split out replaces only the runner, which then finds no server beside it.
pub async fn restore_server_binary(context: &BinaryContext, version: &str) -> Result<PathBuf, BinaryError> {
    let release = fetch_target_release(context, version).await?;
    let binaries = download_release_binaries(&release, context.target, context.http.as_ref()).await?;
    let path = sibling_server_path(&context.exec_path, context.target);
    write_binary_file(&path, &binaries.server)?;
    Ok(path)
}
