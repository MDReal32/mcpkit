import { CRON_MARKER, CRON_SCHEDULE, UPGRADE_ARGS } from "../const";
import type { UpgradeSchedule } from "../types/upgrade-schedule";
import { quoteShellArg } from "./quote-shell-arg";

export const buildCronLine = (schedule: UpgradeSchedule) => {
  const command = [schedule.binaryPath, ...UPGRADE_ARGS].map(quoteShellArg).join(" ");
  return `${CRON_SCHEDULE} ${command} >> ${quoteShellArg(schedule.logPath)} 2>&1 ${CRON_MARKER}`;
};
