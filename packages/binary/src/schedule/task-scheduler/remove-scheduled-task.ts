import { assertSchedulerSuccess } from "../assert-scheduler-success";
import { SCHEDULED_TASK_NAME } from "../const";
import { runSchedulerCommand } from "../run-scheduler-command";
import { isScheduledTaskRegistered } from "./is-scheduled-task-registered";

export const removeScheduledTask = async () => {
  if (!(await isScheduledTaskRegistered())) {
    return false;
  }
  assertSchedulerSuccess(
    await runSchedulerCommand("schtasks", ["/Delete", "/TN", SCHEDULED_TASK_NAME, "/F"]),
    "schtasks /Delete",
  );
  return true;
};
