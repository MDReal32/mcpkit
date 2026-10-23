import { readCachedIndex } from "../local/read-cached-index";
import { resolveUserDir } from "../local/resolve-user-dir";
import { isSyncDue } from "./is-sync-due";

export type SyncStatus = "empty" | "due" | "fresh";

export const readSyncStatus = async (dir = resolveUserDir()) => {
  if ((await readCachedIndex(dir)) === undefined) {
    return "empty" satisfies SyncStatus;
  }
  return (await isSyncDue(dir)) ? "due" : "fresh";
};
