import { describeError } from "@usemcpkit/core";
import { ERROR_TAIL_LINES } from "./const";

/** The last lines of what a failed program wrote to stderr, or the error itself when it wrote nothing. */
export const readFailureOutput = (error: unknown) => {
  const stderr = error instanceof Error && "stderr" in error ? String(error.stderr).trim() : "";
  return stderr === "" ? describeError(error) : stderr.split("\n").slice(-ERROR_TAIL_LINES).join("\n");
};
