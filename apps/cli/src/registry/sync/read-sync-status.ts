import { createRegistryContext } from "../create-registry-context";
import { readCachedIndex } from "../local/read-cached-index";
import type { RegistryContext } from "../types/registry-context";
import { isSyncDue } from "./is-sync-due";

export type SyncStatus = "empty" | "due" | "fresh";

export const readSyncStatus = async (context: RegistryContext = createRegistryContext()) => {
  if ((await readCachedIndex(context.dir)) === undefined) {
    return "empty" satisfies SyncStatus;
  }
  return (await isSyncDue(context)) ? "due" : "fresh";
};
