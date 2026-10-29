import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { assertSchedulerSuccess } from "../assert-scheduler-success";
import { readTextFile } from "../read-text-file";
import { runSchedulerCommand } from "../run-scheduler-command";
import type { UpgradeSchedule } from "../types/upgrade-schedule";
import { buildLaunchAgentPlist } from "./build-launch-agent-plist";
import { resolveLaunchAgentPath } from "./resolve-launch-agent-path";
import { toLaunchdDomain } from "./to-launchd-domain";
import { unloadLaunchAgent } from "./unload-launch-agent";

/** Writes and loads the LaunchAgent; an agent that is already in place is left alone. Resolves true when it changed. */
export const ensureLaunchAgent = async (schedule: UpgradeSchedule) => {
  const path = resolveLaunchAgentPath();
  const plist = buildLaunchAgentPlist(schedule);
  const current = await readTextFile(path);
  if (current === plist) {
    return false;
  }
  await unloadLaunchAgent(path);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, plist);
  assertSchedulerSuccess(
    await runSchedulerCommand("launchctl", ["bootstrap", toLaunchdDomain(), path]),
    "launchctl bootstrap",
  );
  return true;
};
