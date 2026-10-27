import { execFile } from "node:child_process";
import { GIT_COMMAND_TIMEOUT_MS } from "../const";

/** Trimmed stdout of a git command in `cwd`; undefined when git is missing, `cwd` is not a repository or there is no such setting. */
export const readGitOutput = (cwd: string, args: readonly string[]) =>
  new Promise<string | undefined>((resolve) => {
    execFile("git", [...args], { cwd, timeout: GIT_COMMAND_TIMEOUT_MS }, (error, stdout) => {
      resolve(error ? undefined : stdout.trim() || undefined);
    });
  });
