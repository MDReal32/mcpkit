use crate::binary_context::BinaryContext;
use crate::binary_error::BinaryError;
use crate::install::resolve_installed_binary_path;
use crate::schedule::cron::{build_cron_line, update_cron_entry};
use crate::schedule::launchd::ensure_launch_agent;
use crate::schedule::resolve_upgrade_schedule::resolve_upgrade_schedule;
use crate::schedule::scheduler_platform::SchedulerPlatform;
use crate::schedule::task_scheduler::ensure_scheduled_task;
use crate::schedule::to_scheduler_platform::to_scheduler_platform;

/// Registers a job with the OS scheduler (a LaunchAgent on macOS, a crontab line on Linux, a scheduled task on Windows)
/// that runs `usemcpkit upgrade` on the installed runner every few hours. Idempotent; `true` when it changed anything.
pub async fn ensure_upgrade_schedule(context: &BinaryContext) -> Result<bool, BinaryError> {
    let binary_path = resolve_installed_binary_path(&context.home_dir, context.target);
    let schedule = resolve_upgrade_schedule(&binary_path, &context.home_dir);
    match to_scheduler_platform(context.target) {
        SchedulerPlatform::Launchd => ensure_launch_agent(&schedule, &context.env).await,
        SchedulerPlatform::TaskScheduler => ensure_scheduled_task(&schedule, &context.env).await,
        SchedulerPlatform::Cron => update_cron_entry(Some(&build_cron_line(&schedule)), &context.env).await,
    }
}
