import { describeError } from "@usemcpkit/core";
import { printError } from "../output/print-error";
import { runAutoUpdate } from "./run-auto-update";

/** A failed update check is logged to stderr and never affects serving. */
export const checkForUpdate = () =>
  runAutoUpdate().catch((error: unknown) => {
    printError(`mcpkit: update check failed: ${describeError(error)}`);
  });
