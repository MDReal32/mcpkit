import { assertSchedulerSuccess } from "../assert-scheduler-success";
import { NO_CRONTAB_PATTERN } from "../const";
import { runSchedulerCommand } from "../run-scheduler-command";

/** The user's crontab; empty when they have none yet. */
export const readCrontab = async () => {
  const result = await runSchedulerCommand("crontab", ["-l"]);
  if (result.exitCode !== 0 && NO_CRONTAB_PATTERN.test(result.stderr)) {
    return "";
  }
  assertSchedulerSuccess(result, "crontab -l");
  return result.stdout;
};
