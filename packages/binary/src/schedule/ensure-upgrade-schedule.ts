import { resolveInstalledBinaryPath } from "../install/resolve-installed-binary-path";
import type { BinaryContext } from "../types/binary-context";
import { LEGACY_LAUNCH_AGENT_LABEL, LEGACY_SCHEDULED_TASK_NAME } from "./const";
import { buildCronLine } from "./cron/build-cron-line";
import { updateCronEntry } from "./cron/update-cron-entry";
import { ensureLaunchAgent } from "./launchd/ensure-launch-agent";
import { removeLaunchAgent } from "./launchd/remove-launch-agent";
import { resolveUpgradeSchedule } from "./resolve-upgrade-schedule";
import { ensureScheduledTask } from "./task-scheduler/ensure-scheduled-task";
import { removeScheduledTask } from "./task-scheduler/remove-scheduled-task";
import { toSchedulerPlatform } from "./to-scheduler-platform";

/**
 * Registers a job with the OS scheduler (a LaunchAgent on macOS, a crontab line on Linux, a scheduled task on Windows)
 * that runs `usemcpkit upgrade` on the installed binary every few hours, and removes the job an older `mcpkit` release
 * registered, which would keep upgrading the old binary. Idempotent; resolves true when it changed anything.
 */
export const ensureUpgradeSchedule = async (context: BinaryContext) => {
  const schedule = resolveUpgradeSchedule(resolveInstalledBinaryPath(context.target, context.env), context.env);
  const platform = toSchedulerPlatform(context.target);
  if (platform === "launchd") {
    const ensured = await ensureLaunchAgent(schedule);
    const removed = await removeLaunchAgent(LEGACY_LAUNCH_AGENT_LABEL);
    return ensured || removed;
  }
  if (platform === "task-scheduler") {
    const ensured = await ensureScheduledTask(schedule);
    const removed = await removeScheduledTask(LEGACY_SCHEDULED_TASK_NAME);
    return ensured || removed;
  }
  return updateCronEntry(buildCronLine(schedule));
};
