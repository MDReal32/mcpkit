import { rm } from "node:fs/promises";
import { readTextFile } from "../read-text-file";
import { resolveLaunchAgentPath } from "./resolve-launch-agent-path";
import { unloadLaunchAgent } from "./unload-launch-agent";

/** Resolves true when there was an agent to remove. */
export const removeLaunchAgent = async () => {
  const path = resolveLaunchAgentPath();
  if ((await readTextFile(path)) === undefined) {
    return false;
  }
  await unloadLaunchAgent(path);
  await rm(path);
  return true;
};
