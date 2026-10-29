import { SCHEDULED_TASK_NAME } from "../const";
import { runSchedulerCommand } from "../run-scheduler-command";

export const isScheduledTaskRegistered = async () =>
  (await runSchedulerCommand("schtasks", ["/Query", "/TN", SCHEDULED_TASK_NAME])).exitCode === 0;
