import type { BinaryContext } from "../types/binary-context";
import { updateCronEntry } from "./cron/update-cron-entry";
import { removeLaunchAgent } from "./launchd/remove-launch-agent";
import { removeScheduledTask } from "./task-scheduler/remove-scheduled-task";
import { toSchedulerPlatform } from "./to-scheduler-platform";

/** Undoes ensureUpgradeSchedule; resolves true when there was a job to remove. */
export const removeUpgradeSchedule = async (context: BinaryContext) => {
  const platform = toSchedulerPlatform(context.target);
  if (platform === "launchd") {
    return removeLaunchAgent();
  }
  if (platform === "task-scheduler") {
    return removeScheduledTask();
  }
  return updateCronEntry(undefined);
};
