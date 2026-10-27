import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { GIT_COMMAND_TIMEOUT_MS } from "../const";

const run = promisify(execFile);

/** Trimmed stdout of a git command in `cwd`; undefined when git is missing, `cwd` is not a repository or there is no such setting. */
export const readGitOutput = async (cwd: string, args: readonly string[]) => {
  try {
    const { stdout } = await run("git", [...args], { cwd, timeout: GIT_COMMAND_TIMEOUT_MS });
    return stdout.trim() || undefined;
  } catch {
    return undefined;
  }
};
