import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { resolveToolCachePath } from "./resolve-tool-cache-path";
import type { ToolCache } from "./types/tool-cache";

export const writeToolCache = async (dir: string, serverId: string, cache: ToolCache) => {
  const file = resolveToolCachePath(dir, serverId);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(cache, null, 2)}\n`);
};
