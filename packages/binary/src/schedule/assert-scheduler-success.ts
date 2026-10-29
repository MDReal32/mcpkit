import type { SchedulerCommandResult } from "./types/scheduler-command-result";

export const assertSchedulerSuccess = (result: SchedulerCommandResult, description: string) => {
  if (result.exitCode !== 0) {
    throw new Error(`${description} failed (exit ${result.exitCode}): ${result.stderr.trim() || result.stdout.trim()}`);
  }
};
