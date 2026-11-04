use crate::cli::consts::VERSION;
use crate::cli::resolve_server_binary::resolve_server_binary;
use mcpkit_binary::{BinaryContext, is_installed_binary, restore_server_binary};
use mcpkit_core::env::Env;
use mcpkit_http::ReqwestClient;
use std::path::PathBuf;
use std::rc::Rc;

/// The server `--server` names, or the one next to this runner. An updater from before the server was split out
/// replaces only the runner; the runner `mcpkit install` placed then downloads the server of its own version.
pub async fn prepare_server_binary(explicit: Option<PathBuf>) -> Result<PathBuf, String> {
    if let Some(path) = explicit {
        return Ok(path);
    }
    let path = resolve_server_binary().map_err(|error| format!("cannot find the running mcpkit binary: {error}"))?;
    let exists = path
        .try_exists()
        .map_err(|error| format!("cannot read {}: {error}", path.display()))?;
    if exists {
        return Ok(path);
    }
    let http = ReqwestClient::new().map_err(|error| error.0)?;
    let context = BinaryContext::current(Env::from_process(), Rc::new(http)).map_err(|error| error.0)?;
    if !is_installed_binary(&context) {
        return Err(format!(
            "{} is missing; mcpkit-server must sit next to mcpkit",
            path.display()
        ));
    }
    let restored = restore_server_binary(&context, VERSION)
        .await
        .map_err(|error| format!("{} is missing and could not be downloaded: {error}", path.display()))?;
    eprintln!(
        "mcpkit: downloaded the missing {} of mcpkit {VERSION}",
        restored.display()
    );
    Ok(restored)
}
