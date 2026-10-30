import { mkdir, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { CACHE_FILE_NAME } from "../const";
import type { CacheMap } from "../types/cache-map";

export const writeCacheMap = async (dir: string, map: CacheMap) => {
  await mkdir(dir, { recursive: true });
  const file = join(dir, CACHE_FILE_NAME);
  const pending = `${file}.${process.pid}.tmp`;
  await writeFile(pending, `${JSON.stringify(map, null, 2)}\n`);
  await rename(pending, file);
};
