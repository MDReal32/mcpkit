use crate::binary_error::BinaryError;
use crate::schedule::launchd::resolve_launch_agent_path::resolve_launch_agent_path;
use crate::schedule::launchd::unload_launch_agent::unload_launch_agent;
use crate::schedule::read_text_file::read_text_file;
use usemcpkit_core::env::Env;

/// `true` when there was an agent with `label` to remove.
pub async fn remove_launch_agent(label: &str, env: &Env) -> Result<bool, BinaryError> {
    let path = resolve_launch_agent_path(label)?;
    if read_text_file(&path)?.is_none() {
        return Ok(false);
    }
    unload_launch_agent(&path, label, env).await?;
    std::fs::remove_file(&path).map_err(|error| BinaryError(format!("cannot remove {}: {error}", path.display())))?;
    Ok(true)
}
