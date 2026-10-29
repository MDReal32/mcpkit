import { join } from "node:path";
import type { Env } from "@usemcpkit/core";
import { resolveHomeDir } from "@usemcpkit/core";
import { UPGRADE_LOG_FILE_NAME } from "./const";
import type { UpgradeSchedule } from "./types/upgrade-schedule";

export const resolveUpgradeSchedule = (binaryPath: string, env: Env) => {
  const schedule: UpgradeSchedule = { binaryPath, logPath: join(resolveHomeDir(env), UPGRADE_LOG_FILE_NAME) };
  return schedule;
};
