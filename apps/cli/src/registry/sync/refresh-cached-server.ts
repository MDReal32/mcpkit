import { recordCacheEntry } from "../cache/record-cache-entry";
import { downloadManifest } from "../catalog/download-manifest";
import { hashText } from "../ids/hash-text";
import { resolveManifestPath } from "../ids/resolve-manifest-path";
import { readCachedManifestText } from "../local/read-cached-manifest-text";
import type { RegistryContext } from "../types/registry-context";
import type { RegistryServer } from "../types/registry-server";
import { refreshCachedParts } from "./refresh-cached-parts";

/**
 * Brings what is cached of one server up to date with the index: its manifest or shell, then its cached parts.
 * A server nobody used has nothing cached and is skipped. Returns the ids of the files it replaced.
 */
export const refreshCachedServer = async (server: RegistryServer, context: RegistryContext) => {
  const cached = await readCachedManifestText(context.dir, server.id);
  if (cached === undefined) {
    return [];
  }
  const refreshed: string[] = [];
  if (hashText(cached) === server.sha256) {
    await recordCacheEntry(context, resolveManifestPath(context.dir, server.id), cached);
  } else {
    await downloadManifest(server, context);
    refreshed.push(server.id);
  }
  return [...refreshed, ...(await refreshCachedParts(server, context))];
};
