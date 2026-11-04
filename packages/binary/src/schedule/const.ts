/** How often the scheduled job runs `usemcpkit upgrade`; the check is one small npm metadata request. */
export const UPGRADE_INTERVAL_HOURS = 6;

export const UPGRADE_LOG_FILE_NAME = "upgrade.log";

export const UPGRADE_ARGS: readonly string[] = ["upgrade"];

export const SCHEDULER_COMMAND_TIMEOUT_MS = 10_000;

export const LAUNCH_AGENT_LABEL = "org.mdreal.usemcpkit.upgrade";

export const LAUNCH_AGENTS_DIR = "Library/LaunchAgents";

/** Every line usemcpkit adds to the user's crontab ends with this comment, so it is found and replaced, never duplicated. */
export const CRON_MARKER = "# usemcpkit: scheduled upgrade";

/** Minute 17, every UPGRADE_INTERVAL_HOURS hours. */
export const CRON_SCHEDULE = `17 */${UPGRADE_INTERVAL_HOURS} * * *`;

/** `crontab -l` exits 1 with this on stderr when the user has no crontab yet. */
export const NO_CRONTAB_PATTERN = /no crontab for/i;

export const SCHEDULED_TASK_NAME = "usemcpkit upgrade";
