import { join } from "node:path";
import { describeError } from "@usemcpkit/core";
import { touchCacheEntry } from "../cache/touch-cache-entry";
import { INDEX_CHECK_TIMEOUT_MS, INDEX_FILE_NAME } from "../const";
import { writeCachedIndex } from "../local/write-cached-index";
import { fetchRegistryIndex } from "../remote/fetch-registry-index";
import type { RegistryContext } from "../types/registry-context";

/**
 * Re-fetches the index with a short timeout. The check is marked before fetching, so a registry that cannot be
 * reached costs one wait per interval and the cache keeps serving.
 */
export const refreshIndex = async (context: RegistryContext) => {
  await touchCacheEntry(context, join(context.dir, INDEX_FILE_NAME));
  try {
    await writeCachedIndex(context, await fetchRegistryIndex(context, INDEX_CHECK_TIMEOUT_MS));
  } catch (error) {
    context.warn(`mcpkit: could not check the registry, using the cache: ${describeError(error)}`);
  }
};
