import { describeError, isMissingFileError } from "@usemcpkit/core";
import { printError } from "../../cli/output/print-error";
import { BINARY_POLL_INTERVAL_MS } from "./const";
import { readFileSignature } from "./read-file-signature";

/**
 * Polls `path` and calls `onChange` once after it changed and stayed the same for two polls, so a download in
 * progress is not picked up half written. Polling survives rename-replacement, which file watchers can lose.
 * A missing file is skipped: Windows moves the old binary aside before the new one is in place.
 */
export const watchBinaryFile = async (path: string, onChange: () => void, intervalMs = BINARY_POLL_INTERVAL_MS) => {
  let applied = await readFileSignature(path);
  let candidate: string | undefined;
  let polling = false;
  const poll = async () => {
    if (polling) {
      return;
    }
    polling = true;
    try {
      const signature = await readFileSignature(path);
      if (signature === applied) {
        candidate = undefined;
      } else if (signature !== candidate) {
        candidate = signature;
      } else {
        applied = signature;
        candidate = undefined;
        onChange();
      }
    } catch (error) {
      if (!isMissingFileError(error)) {
        printError(`mcpkit: cannot read ${path}: ${describeError(error)}`);
      }
    } finally {
      polling = false;
    }
  };
  const timer = setInterval(() => {
    void poll();
  }, intervalMs);
  timer.unref();
  return () => {
    clearInterval(timer);
  };
};
