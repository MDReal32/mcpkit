use crate::binary_error::BinaryError;
use crate::schedule::assert_scheduler_success::assert_scheduler_success;
use crate::schedule::launchd::build_launch_agent_plist::build_launch_agent_plist;
use crate::schedule::launchd::resolve_launch_agent_path::resolve_launch_agent_path;
use crate::schedule::launchd::to_launchd_domain::to_launchd_domain;
use crate::schedule::launchd::unload_launch_agent::unload_launch_agent;
use crate::schedule::read_text_file::read_text_file;
use crate::schedule::run_scheduler_command::run_scheduler_command;
use crate::schedule::upgrade_schedule::UpgradeSchedule;
use mcpkit_core::env::Env;

/// Writes and loads the LaunchAgent; an agent that is already in place is left alone. `true` when it changed.
pub async fn ensure_launch_agent(schedule: &UpgradeSchedule, env: &Env) -> Result<bool, BinaryError> {
    let path = resolve_launch_agent_path()?;
    let plist = build_launch_agent_plist(schedule);
    if read_text_file(&path)?.as_deref() == Some(plist.as_str()) {
        return Ok(false);
    }
    unload_launch_agent(&path, env).await?;
    let failed = |error: std::io::Error| BinaryError(format!("cannot write {}: {error}", path.display()));
    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent).map_err(failed)?;
    }
    std::fs::write(&path, &plist).map_err(failed)?;
    let domain = to_launchd_domain();
    let plist_path = path.to_string_lossy();
    let result = run_scheduler_command("launchctl", &["bootstrap", &domain, &plist_path], None, env).await?;
    assert_scheduler_success(&result, "launchctl bootstrap")?;
    Ok(true)
}
