import { join } from "node:path";
import { readCacheEntry } from "../cache/read-cache-entry";
import { INDEX_CHECK_INTERVAL_MS, INDEX_FILE_NAME } from "../const";
import type { RegistryContext } from "../types/registry-context";

/** The index was never checked, or its last check is older than the interval. */
export const isSyncDue = async (context: RegistryContext, now = Date.now()) => {
  const entry = await readCacheEntry(context, join(context.dir, INDEX_FILE_NAME));
  return entry === undefined || now - entry.checkedAt >= INDEX_CHECK_INTERVAL_MS;
};
