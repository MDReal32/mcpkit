import type { BinaryContext } from "../types/binary-context";
import {
  LAUNCH_AGENT_LABEL,
  LEGACY_LAUNCH_AGENT_LABEL,
  LEGACY_SCHEDULED_TASK_NAME,
  SCHEDULED_TASK_NAME,
} from "./const";
import { updateCronEntry } from "./cron/update-cron-entry";
import { removeLaunchAgent } from "./launchd/remove-launch-agent";
import { removeScheduledTask } from "./task-scheduler/remove-scheduled-task";
import { toSchedulerPlatform } from "./to-scheduler-platform";

/**
 * Undoes ensureUpgradeSchedule, the job of an older `mcpkit` release included; resolves true when there was a job to
 * remove.
 */
export const removeUpgradeSchedule = async (context: BinaryContext) => {
  const platform = toSchedulerPlatform(context.target);
  if (platform === "launchd") {
    const removed = await removeLaunchAgent(LAUNCH_AGENT_LABEL);
    const removedLegacy = await removeLaunchAgent(LEGACY_LAUNCH_AGENT_LABEL);
    return removed || removedLegacy;
  }
  if (platform === "task-scheduler") {
    const removed = await removeScheduledTask(SCHEDULED_TASK_NAME);
    const removedLegacy = await removeScheduledTask(LEGACY_SCHEDULED_TASK_NAME);
    return removed || removedLegacy;
  }
  return updateCronEntry(undefined);
};
