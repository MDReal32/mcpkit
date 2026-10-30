import { isJsonObject } from "@usemcpkit/core";
import { SHA256_PATTERN } from "../const";
import type { CacheEntry } from "../types/cache-entry";
import type { CacheMap } from "../types/cache-map";

const isCacheEntry = (value: unknown): value is CacheEntry =>
  isJsonObject(value) &&
  typeof value.updatedAt === "number" &&
  typeof value.checkedAt === "number" &&
  typeof value.sha256 === "string" &&
  SHA256_PATTERN.test(value.sha256);

export const parseCacheMap = (body: unknown) => {
  if (!isJsonObject(body)) {
    throw new Error("the cache map must be an object");
  }
  const map: CacheMap = {};
  for (const [path, entry] of Object.entries(body)) {
    if (!isCacheEntry(entry)) {
      throw new Error(`the cache map entry of ${path} is invalid`);
    }
    map[path] = entry;
  }
  return map;
};
