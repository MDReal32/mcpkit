import { join } from "node:path";
import { describeError } from "@usemcpkit/core";
import { touchCacheEntry } from "../cache/touch-cache-entry";
import { INDEX_FILE_NAME } from "../const";
import { createRegistryContext } from "../create-registry-context";
import { writeCachedIndex } from "../local/write-cached-index";
import { fetchRegistryIndex } from "../remote/fetch-registry-index";
import type { RegistryOptions } from "../types/registry-options";
import type { SyncFailure } from "../types/sync-failure";
import type { SyncReport } from "../types/sync-report";
import { refreshCachedServer } from "./refresh-cached-server";

/**
 * Refreshes the cached index and re-downloads only the manifests and parts that are already cached and no longer
 * match it; servers and parts nobody used are never downloaded.
 */
export const syncRegistry = async (options: RegistryOptions = {}) => {
  const context = createRegistryContext(options);
  await touchCacheEntry(context, join(context.dir, INDEX_FILE_NAME));
  const index = await fetchRegistryIndex(context);
  await writeCachedIndex(context, index);
  const refreshed: string[] = [];
  const failed: SyncFailure[] = [];
  for (const server of index.servers) {
    try {
      refreshed.push(...(await refreshCachedServer(server, context)));
    } catch (error) {
      failed.push({ id: server.id, error: describeError(error) });
    }
  }
  const report: SyncReport = { servers: index.servers.length, refreshed, failed };
  return report;
};
