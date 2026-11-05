import { spawn } from "node:child_process";
import { constants } from "node:os";

/**
 * Runs `binary` with `args` on this process's stdio and resolves the code to exit with: its own, or 128 plus the
 * signal number when a signal ended it, as a shell reports it.
 */
export const runBinary = (binary: string, args: readonly string[]) =>
  new Promise<number>((resolve, reject) => {
    const child = spawn(binary, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal !== null) {
        resolve(128 + constants.signals[signal]);
        return;
      }
      resolve(code ?? 0);
    });
  });
