import { readCachedIndex, resolveUserDir } from "../../registry";
import { syncQuietly } from "./sync-quietly";

/**
 * No manifests ship in the binary, so with no index on disk the first sync is awaited. Nothing else is updated while
 * serving: `usemcpkit update` refreshes what is cached, and the scheduled `usemcpkit upgrade` runs it.
 */
export const ensureManifestIndex = async () => {
  if ((await readCachedIndex(resolveUserDir())) === undefined) {
    await syncQuietly();
  }
};
