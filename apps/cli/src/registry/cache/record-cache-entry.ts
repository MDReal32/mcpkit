import { hashText } from "../ids/hash-text";
import type { CacheEntry } from "../types/cache-entry";
import type { RegistryContext } from "../types/registry-context";
import { readCacheMap } from "./read-cache-map";
import { toCachePath } from "./to-cache-path";
import { writeCacheMap } from "./write-cache-map";

/** Notes that `text` is what `file` holds now and is current; `updatedAt` moves only when the content differs from the last one noted. */
export const recordCacheEntry = async (context: RegistryContext, file: string, text: string, now = Date.now()) => {
  const path = toCachePath(context.dir, file);
  const map = await readCacheMap(context);
  const sha256 = hashText(text);
  const previous = map[path];
  const entry: CacheEntry = {
    updatedAt: previous?.sha256 === sha256 ? previous.updatedAt : now,
    checkedAt: now,
    sha256,
  };
  await writeCacheMap(context.dir, { ...map, [path]: entry });
};
