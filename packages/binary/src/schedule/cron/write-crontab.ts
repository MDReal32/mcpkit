import { assertSchedulerSuccess } from "../assert-scheduler-success";
import { runSchedulerCommand } from "../run-scheduler-command";

export const writeCrontab = async (crontab: string) => {
  assertSchedulerSuccess(await runSchedulerCommand("crontab", ["-"], crontab), "crontab -");
};
