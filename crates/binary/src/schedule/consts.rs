use std::time::Duration;

/// How often the scheduled job runs `usemcpkit upgrade`; the check is one small npm metadata request.
pub const UPGRADE_INTERVAL_HOURS: u32 = 6;

pub const SECONDS_PER_HOUR: u32 = 3600;

pub const UPGRADE_LOG_FILE_NAME: &str = "upgrade.log";

pub const UPGRADE_ARGS: &[&str] = &["upgrade"];

pub const SCHEDULER_COMMAND_TIMEOUT: Duration = Duration::from_secs(10);

pub const LAUNCH_AGENT_LABEL: &str = "org.mdreal.usemcpkit.upgrade";

/// The label releases wrote before the brand became usemcpkit; installing and uninstalling remove its agent.
pub const LEGACY_LAUNCH_AGENT_LABEL: &str = "org.mdreal.mcpkit.upgrade";

pub const LAUNCH_AGENTS_DIR: [&str; 2] = ["Library", "LaunchAgents"];

/// Every line usemcpkit adds to the user's crontab ends with this comment, so it is found and replaced, never duplicated.
pub const CRON_MARKER: &str = "# usemcpkit: scheduled upgrade";

/// The marker of the crontab line releases wrote before the brand became usemcpkit; any update drops that line.
pub const LEGACY_CRON_MARKER: &str = "# mcpkit: scheduled upgrade";

/// Minute 17, every `UPGRADE_INTERVAL_HOURS` hours.
pub const CRON_SCHEDULE: &str = "17 */6 * * *";

/// `crontab -l` exits 1 with this on stderr (in any case) when the user has no crontab yet.
pub const NO_CRONTAB_TEXT: &str = "no crontab for";

pub const SCHEDULED_TASK_NAME: &str = "usemcpkit upgrade";

/// The task releases registered before the brand became usemcpkit; installing and uninstalling remove it.
pub const LEGACY_SCHEDULED_TASK_NAME: &str = "mcpkit upgrade";
