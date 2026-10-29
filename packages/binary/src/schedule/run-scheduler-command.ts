import { spawn } from "node:child_process";
import { SCHEDULER_COMMAND_TIMEOUT_MS } from "./const";
import type { SchedulerCommandResult } from "./types/scheduler-command-result";

/** Runs a scheduler tool (`crontab`, `launchctl`, `schtasks`) without a shell; a non-zero exit is returned, not thrown. */
export const runSchedulerCommand = (command: string, args: readonly string[], input?: string) =>
  new Promise<SchedulerCommandResult>((resolve, reject) => {
    const child = spawn(command, [...args], { timeout: SCHEDULER_COMMAND_TIMEOUT_MS, windowsHide: true });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      const result: SchedulerCommandResult = { exitCode: code ?? 1, stdout, stderr };
      resolve(result);
    });
    child.stdin.end(input);
  });
