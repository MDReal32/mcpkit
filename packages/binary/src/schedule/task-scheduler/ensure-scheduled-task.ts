import { assertSchedulerSuccess } from "../assert-scheduler-success";
import { SCHEDULED_TASK_NAME, UPGRADE_ARGS, UPGRADE_INTERVAL_HOURS } from "../const";
import { runSchedulerCommand } from "../run-scheduler-command";
import type { UpgradeSchedule } from "../types/upgrade-schedule";
import { isScheduledTaskRegistered } from "./is-scheduled-task-registered";

/** Registers the task once; Task Scheduler keeps no log of its own here, so `logPath` is unused on Windows. */
export const ensureScheduledTask = async (schedule: UpgradeSchedule) => {
  if (await isScheduledTaskRegistered()) {
    return false;
  }
  const taskRun = [`"${schedule.binaryPath}"`, ...UPGRADE_ARGS].join(" ");
  const args = [
    "/Create",
    "/TN",
    SCHEDULED_TASK_NAME,
    "/TR",
    taskRun,
    "/SC",
    "HOURLY",
    "/MO",
    `${UPGRADE_INTERVAL_HOURS}`,
    "/F",
  ];
  assertSchedulerSuccess(await runSchedulerCommand("schtasks", args), "schtasks /Create");
  return true;
};
