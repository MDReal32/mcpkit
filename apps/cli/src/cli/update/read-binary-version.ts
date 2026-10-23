import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const VERSION_TIMEOUT_MS = 10_000;

/** Asks an mcpkit binary for its version, since the installed file can be older than the running CLI. */
export const readBinaryVersion = async (path: string) => {
  const { stdout } = await promisify(execFile)(path, ['--version'], { timeout: VERSION_TIMEOUT_MS });
  return stdout.trim();
};
