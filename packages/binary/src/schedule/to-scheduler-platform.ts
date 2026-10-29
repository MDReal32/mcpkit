import type { Target } from "../platform";

export const toSchedulerPlatform = (target: Target) => {
  if (target.startsWith("darwin-")) {
    return "launchd";
  }
  if (target.startsWith("windows-")) {
    return "task-scheduler";
  }
  return "cron";
};
