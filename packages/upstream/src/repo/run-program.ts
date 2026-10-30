import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createChildEnv } from "../transport/create-child-env";
import { UpstreamError } from "../upstream-error";
import { MAX_OUTPUT_BYTES, SETUP_TIMEOUT_MS } from "./const";
import { readFailureOutput } from "./read-failure-output";

const execFileAsync = promisify(execFile);

/**
 * Runs one program without a shell in `cwd` and returns what it printed. The environment is the minimal inherited
 * one, so a repository's install scripts never see the credentials the server will later be given; git never prompts.
 */
export const runProgram = async (
  command: string,
  args: readonly string[],
  cwd: string,
  timeoutMs = SETUP_TIMEOUT_MS,
) => {
  try {
    const { stdout } = await execFileAsync(command, [...args], {
      cwd,
      env: { ...createChildEnv(undefined), GIT_TERMINAL_PROMPT: "0" },
      timeout: timeoutMs,
      maxBuffer: MAX_OUTPUT_BYTES,
      shell: false,
    });
    return stdout.trim();
  } catch (error) {
    throw new UpstreamError(`${[command, ...args].join(" ")} failed in ${cwd}: ${readFailureOutput(error)}`);
  }
};
