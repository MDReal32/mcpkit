import { resolveInstalledBinaryPath } from "../install/resolve-installed-binary-path";
import type { BinaryContext } from "../types/binary-context";
import { buildCronLine } from "./cron/build-cron-line";
import { updateCronEntry } from "./cron/update-cron-entry";
import { ensureLaunchAgent } from "./launchd/ensure-launch-agent";
import { resolveUpgradeSchedule } from "./resolve-upgrade-schedule";
import { ensureScheduledTask } from "./task-scheduler/ensure-scheduled-task";
import { toSchedulerPlatform } from "./to-scheduler-platform";

/**
 * Registers a job with the OS scheduler (a LaunchAgent on macOS, a crontab line on Linux, a scheduled task on Windows)
 * that runs `mcpkit upgrade` on the installed binary every few hours. Idempotent; resolves true when it changed anything.
 */
export const ensureUpgradeSchedule = async (context: BinaryContext) => {
  const schedule = resolveUpgradeSchedule(resolveInstalledBinaryPath(context.target, context.env), context.env);
  const platform = toSchedulerPlatform(context.target);
  if (platform === "launchd") {
    return ensureLaunchAgent(schedule);
  }
  if (platform === "task-scheduler") {
    return ensureScheduledTask(schedule);
  }
  return updateCronEntry(buildCronLine(schedule));
};
