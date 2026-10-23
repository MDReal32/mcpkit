import type { SyncFailure } from "./sync-failure";

export interface SyncReport {
  servers: number;
  /** Cached manifests that were out of date and re-downloaded. */
  refreshed: readonly string[];
  failed: readonly SyncFailure[];
}
