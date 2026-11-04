import { rm } from "node:fs/promises";
import { readTextFile } from "../read-text-file";
import { resolveLaunchAgentPath } from "./resolve-launch-agent-path";
import { unloadLaunchAgent } from "./unload-launch-agent";

/** Resolves true when there was an agent with `label` to remove. */
export const removeLaunchAgent = async (label: string) => {
  const path = resolveLaunchAgentPath(label);
  if ((await readTextFile(path)) === undefined) {
    return false;
  }
  await unloadLaunchAgent(path, label);
  await rm(path);
  return true;
};
