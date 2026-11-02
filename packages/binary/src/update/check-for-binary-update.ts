import { UPDATE_CHECK_INTERVAL_MS } from "../const";
import type { BinaryContext } from "../types/binary-context";
import { readUpdateState } from "./read-update-state";
import { updateBinary } from "./update-binary";
import { writeUpdateState } from "./write-update-state";

/**
 * Updates the binary at `path` at most once per UPDATE_CHECK_INTERVAL_MS. The check is recorded only once it has
 * finished, so one that failed (offline, registry error) is tried again by the next caller instead of waiting out
 * the interval. Resolves undefined while the interval has not passed.
 */
export const checkForBinaryUpdate = async (
  context: BinaryContext,
  path: string,
  currentVersion: string,
  now = Date.now(),
) => {
  const state = await readUpdateState(context.env);
  if (now - state.checkedAt < UPDATE_CHECK_INTERVAL_MS) {
    return undefined;
  }
  const result = await updateBinary(context, path, currentVersion);
  await writeUpdateState(context.env, { checkedAt: now });
  return result;
};
