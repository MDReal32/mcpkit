import { CRON_MARKER } from "../const";

/** The crontab without mcpkit's line, plus `line` when given; every other line is kept as it is. */
export const replaceCronEntry = (crontab: string, line: string | undefined) => {
  const kept = crontab.split("\n").filter((entry) => entry !== "" && !entry.endsWith(CRON_MARKER));
  const lines = line === undefined ? kept : [...kept, line];
  return lines.length === 0 ? "" : `${lines.join("\n")}\n`;
};
