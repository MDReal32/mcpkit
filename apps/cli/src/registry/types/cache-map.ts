import type { CacheEntry } from "./cache-entry";

/** Cached files by their path inside the registry folder, for example `git/github/issues.json`. */
export type CacheMap = Record<string, CacheEntry>;
