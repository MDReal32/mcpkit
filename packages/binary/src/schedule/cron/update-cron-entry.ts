import { readCrontab } from "./read-crontab";
import { replaceCronEntry } from "./replace-cron-entry";
import { writeCrontab } from "./write-crontab";

/** Sets mcpkit's crontab line to `line`, or removes it when undefined. Resolves true when the crontab changed. */
export const updateCronEntry = async (line: string | undefined) => {
  const current = await readCrontab();
  const updated = replaceCronEntry(current, line);
  if (updated === current) {
    return false;
  }
  await writeCrontab(updated);
  return true;
};
