import { join } from "node:path";
import { describeError } from "@usemcpkit/core";
import { recordCacheEntry } from "../cache/record-cache-entry";
import { touchCacheEntry } from "../cache/touch-cache-entry";
import { downloadManifest } from "../catalog/download-manifest";
import { INDEX_FILE_NAME } from "../const";
import { createRegistryContext } from "../create-registry-context";
import { hashText } from "../ids/hash-text";
import { resolveManifestPath } from "../ids/resolve-manifest-path";
import { readCachedManifestText } from "../local/read-cached-manifest-text";
import { writeCachedIndex } from "../local/write-cached-index";
import { fetchRegistryIndex } from "../remote/fetch-registry-index";
import type { RegistryOptions } from "../types/registry-options";
import type { SyncFailure } from "../types/sync-failure";
import type { SyncReport } from "../types/sync-report";

/**
 * Refreshes the cached index and re-downloads only manifests that are already cached and no longer match it;
 * servers nobody used are never downloaded. The attempt is marked before fetching so a failing registry is
 * retried once an interval, not on every start.
 */
export const syncRegistry = async (options: RegistryOptions = {}) => {
  const context = createRegistryContext(options);
  await touchCacheEntry(context, join(context.dir, INDEX_FILE_NAME));
  const index = await fetchRegistryIndex(context);
  await writeCachedIndex(context, index);
  const refreshed: string[] = [];
  const failed: SyncFailure[] = [];
  for (const server of index.servers) {
    const cached = await readCachedManifestText(context.dir, server.id);
    if (cached === undefined) {
      continue;
    }
    if (hashText(cached) === server.sha256) {
      await recordCacheEntry(context, resolveManifestPath(context.dir, server.id), cached);
      continue;
    }
    try {
      await downloadManifest(server, context);
      refreshed.push(server.id);
    } catch (error) {
      failed.push({ id: server.id, error: describeError(error) });
    }
  }
  const report: SyncReport = { servers: index.servers.length, refreshed, failed };
  return report;
};
