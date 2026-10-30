import type { RegistryContext } from "../types/registry-context";
import { readCacheMap } from "./read-cache-map";
import { toCachePath } from "./to-cache-path";

export const readCacheEntry = async (context: RegistryContext, file: string) => {
  const map = await readCacheMap(context);
  return map[toCachePath(context.dir, file)];
};
