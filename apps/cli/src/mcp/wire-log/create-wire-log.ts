import { appendFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { describeError } from "@usemcpkit/core";
import { printError } from "../../cli/output/print-error";
import { WIRE_LOG_DIR_NAME, WIRE_LOG_ENABLED, WIRE_LOG_ENV } from "./const";
import type { WireLog } from "./types/wire-log";
import type { WireLogRole } from "./types/wire-log-role";

const disabledWireLog: WireLog = () => undefined;

/**
 * Returns a logger that appends one JSON line per event to its own file, or a no-op when the env flag is off. A
 * failed write is reported once on stderr and turns the log off, so a full disk never stops serving.
 */
export const createWireLog = (role: WireLogRole, env: NodeJS.ProcessEnv = process.env, home = homedir()) => {
  if (env[WIRE_LOG_ENV] !== WIRE_LOG_ENABLED) {
    return disabledWireLog;
  }
  const directory = join(home, ".mcpkit", WIRE_LOG_DIR_NAME);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const file = join(directory, `${role}-${stamp}-${process.pid}.jsonl`);
  let enabled = true;
  const record: WireLog = (event, details = {}) => {
    if (!enabled) {
      return;
    }
    const entry = { time: new Date().toISOString(), role, pid: process.pid, ppid: process.ppid, event, ...details };
    try {
      mkdirSync(directory, { recursive: true });
      appendFileSync(file, `${JSON.stringify(entry)}\n`);
    } catch (error) {
      enabled = false;
      printError(`mcpkit: wire log ${file} turned off: ${describeError(error)}`);
    }
  };
  record("start", { execPath: process.execPath, argv: process.argv.slice(2) });
  return record;
};
