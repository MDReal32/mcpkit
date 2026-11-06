use crate::cli::consts::VERSION;
use crate::cli::serve::resolve_server_binary::resolve_server_binary;
use crate::cli::update::create_binary_context;
use std::path::PathBuf;
use usemcpkit_binary::{BinaryLayout, is_installed_binary, restore_server_binary};

/// The server `--server` names; a dev build, which is its own server; or the one next to this runner. An updater from
/// before the server was split out replaces only the runner; the runner `usemcpkit install` placed then downloads the
/// server of its own version.
pub async fn prepare_server_binary(explicit: Option<PathBuf>, layout: BinaryLayout) -> Result<PathBuf, String> {
    if let Some(path) = explicit {
        return Ok(path);
    }
    if layout == BinaryLayout::Combined {
        return std::env::current_exe().map_err(|error| format!("cannot find the running usemcpkit binary: {error}"));
    }
    let path = resolve_server_binary().map_err(|error| format!("cannot find the running usemcpkit binary: {error}"))?;
    let exists = path
        .try_exists()
        .map_err(|error| format!("cannot read {}: {error}", path.display()))?;
    if exists {
        return Ok(path);
    }
    let context = create_binary_context(layout)?;
    if !is_installed_binary(&context) {
        return Err(format!(
            "{} is missing; usemcpkit-servers must sit next to usemcpkit",
            path.display()
        ));
    }
    let restored = restore_server_binary(&context, VERSION)
        .await
        .map_err(|error| format!("{} is missing and could not be downloaded: {error}", path.display()))?;
    eprintln!(
        "usemcpkit: downloaded the missing {} of usemcpkit {VERSION}",
        restored.display()
    );
    Ok(restored)
}
