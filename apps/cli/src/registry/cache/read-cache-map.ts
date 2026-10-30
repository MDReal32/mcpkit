import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describeError, isMissingFileError } from "@usemcpkit/core";
import { CACHE_FILE_NAME } from "../const";
import type { CacheMap } from "../types/cache-map";
import type { RegistryContext } from "../types/registry-context";
import { parseCacheMap } from "./parse-cache-map";

/** The map only describes the cached files, which are checked against their hashes anyway: an unreadable one is rebuilt. */
export const readCacheMap = async ({ dir, warn }: RegistryContext) => {
  const file = join(dir, CACHE_FILE_NAME);
  const empty: CacheMap = {};
  try {
    return parseCacheMap(JSON.parse(await readFile(file, "utf8")));
  } catch (error) {
    if (!isMissingFileError(error)) {
      warn(`mcpkit: ${file} is unreadable and will be rebuilt: ${describeError(error)}`);
    }
    return empty;
  }
};
