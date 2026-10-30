import { readCachedIndex } from "../local/read-cached-index";
import { isSyncDue } from "../sync/is-sync-due";
import { refreshIndex } from "../sync/refresh-index";
import type { RegistryContext } from "../types/registry-context";
import type { RegistryServer } from "../types/registry-server";

/**
 * The server's entry in the newest cached index. The index is re-checked when its last check is older than the
 * interval; the entry is then read from disk, where another process may also have refreshed it.
 */
export const revalidateServer = async (server: RegistryServer, context: RegistryContext) => {
  if (context.revalidate && (await isSyncDue(context))) {
    await refreshIndex(context);
  }
  const index = await readCachedIndex(context.dir);
  return index?.servers.find((candidate) => candidate.id === server.id) ?? server;
};
