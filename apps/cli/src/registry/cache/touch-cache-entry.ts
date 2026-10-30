import type { RegistryContext } from "../types/registry-context";
import { readCacheMap } from "./read-cache-map";
import { toCachePath } from "./to-cache-path";
import { writeCacheMap } from "./write-cache-map";

/** Marks a cached file as checked now without changing what is known about its content; unknown files stay unknown. */
export const touchCacheEntry = async (context: RegistryContext, file: string, now = Date.now()) => {
  const path = toCachePath(context.dir, file);
  const map = await readCacheMap(context);
  const previous = map[path];
  if (!previous) {
    return;
  }
  await writeCacheMap(context.dir, { ...map, [path]: { ...previous, checkedAt: now } });
};
