import { spawn } from "node:child_process";
import { once } from "node:events";
import { join } from "node:path";
import { AUTO_UPDATE_ENV, HOME_ENV, REGISTRY_ENV, RUNNER_NAME } from "./const.ts";
import type { DevPaths } from "./types/dev-paths.ts";

export const runUsemcpkit = async (paths: DevPaths, registryUrl: string, args: string[], quiet: boolean) => {
  const child = spawn(join(paths.binDir, RUNNER_NAME), args, {
    env: { ...process.env, [HOME_ENV]: paths.home, [REGISTRY_ENV]: registryUrl, [AUTO_UPDATE_ENV]: "0" },
    stdio: quiet ? ["ignore", "pipe", "pipe"] : "inherit",
  });
  let output = "";
  if (quiet) {
    child.stdout?.on("data", (chunk) => {
      output += chunk;
    });
    child.stderr?.on("data", (chunk) => {
      output += chunk;
    });
  }
  const [code] = await once(child, "exit");
  const exitCode = code === null ? 1 : Number(code);
  if (quiet && exitCode !== 0) {
    process.stderr.write(`usemcpkit ${args.join(" ")} exited with ${exitCode}:\n${output}\n`);
  }
  return exitCode;
};
