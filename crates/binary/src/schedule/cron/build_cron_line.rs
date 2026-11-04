use crate::schedule::consts::{CRON_MARKER, CRON_SCHEDULE, UPGRADE_ARGS};
use crate::schedule::cron::quote_shell_arg::quote_shell_arg;
use crate::schedule::upgrade_schedule::UpgradeSchedule;

pub fn build_cron_line(schedule: &UpgradeSchedule) -> String {
    let binary_path = schedule.binary_path.to_string_lossy();
    let command = std::iter::once(binary_path.as_ref())
        .chain(UPGRADE_ARGS.iter().copied())
        .map(quote_shell_arg)
        .collect::<Vec<_>>()
        .join(" ");
    let log_path = quote_shell_arg(&schedule.log_path.to_string_lossy());
    format!("{CRON_SCHEDULE} {command} >> {log_path} 2>&1 {CRON_MARKER}")
}
