import { runSchedulerCommand } from "../run-scheduler-command";

export const isScheduledTaskRegistered = async (name: string) =>
  (await runSchedulerCommand("schtasks", ["/Query", "/TN", name])).exitCode === 0;
