import { AUTO_UPDATE_ENV } from "../const";
import { isInstalledBinary } from "../install/is-installed-binary";
import type { BinaryContext } from "../types/binary-context";
import { checkForBinaryUpdate } from "./check-for-binary-update";

/**
 * Runs for the binary that `usemcpkit install` placed, unless MCPKIT_AUTO_UPDATE is `0`. The new binary takes effect
 * the next time the client starts the server. Resolves undefined when skipped.
 */
export const autoUpdateBinary = async (context: BinaryContext, currentVersion: string, now = Date.now()) => {
  if (context.env[AUTO_UPDATE_ENV] === "0" || !isInstalledBinary(context)) {
    return undefined;
  }
  return checkForBinaryUpdate(context, process.execPath, currentVersion, now);
};
