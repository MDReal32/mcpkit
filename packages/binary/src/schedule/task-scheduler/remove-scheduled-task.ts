import { assertSchedulerSuccess } from "../assert-scheduler-success";
import { runSchedulerCommand } from "../run-scheduler-command";
import { isScheduledTaskRegistered } from "./is-scheduled-task-registered";

/** Resolves true when there was a task named `name` to remove. */
export const removeScheduledTask = async (name: string) => {
  if (!(await isScheduledTaskRegistered(name))) {
    return false;
  }
  assertSchedulerSuccess(await runSchedulerCommand("schtasks", ["/Delete", "/TN", name, "/F"]), "schtasks /Delete");
  return true;
};
