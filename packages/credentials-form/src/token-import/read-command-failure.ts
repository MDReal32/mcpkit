import type { CliTokenCommand } from "@usemcpkit/core";
import { isJsonObject } from "@usemcpkit/core";

/** The reason a CLI gave on stderr, or that it is not installed; undefined when neither is known. */
export const readCommandFailure = (cli: CliTokenCommand, error: unknown) => {
  if (!isJsonObject(error)) {
    return undefined;
  }
  if (error.code === "ENOENT") {
    return `"${cli.command}" is not installed or not on PATH`;
  }
  return typeof error.stderr === "string" && error.stderr.trim() ? error.stderr.trim() : undefined;
};
