import { AUTO_UPDATE_ENV, UPDATE_CHECK_INTERVAL_MS } from "../const";
import { isInstalledBinary } from "../install/is-installed-binary";
import type { BinaryContext } from "../types/binary-context";
import { readUpdateState } from "./read-update-state";
import { updateBinary } from "./update-binary";
import { writeUpdateState } from "./write-update-state";

/**
 * Runs at most once per UPDATE_CHECK_INTERVAL_MS and only for the binary that `mcpkit install` placed.
 * The new binary takes effect the next time the client starts the server. Resolves undefined when skipped.
 */
export const autoUpdateBinary = async (context: BinaryContext, currentVersion: string, now = Date.now()) => {
  if (context.env[AUTO_UPDATE_ENV] === "0" || !isInstalledBinary(context)) {
    return undefined;
  }
  const state = await readUpdateState(context.env);
  if (now - state.checkedAt < UPDATE_CHECK_INTERVAL_MS) {
    return undefined;
  }
  await writeUpdateState(context.env, { checkedAt: now });
  return updateBinary(context, process.execPath, currentVersion);
};
