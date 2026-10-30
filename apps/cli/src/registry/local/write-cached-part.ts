import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { recordCacheEntry } from "../cache/record-cache-entry";
import type { RegistryContext } from "../types/registry-context";
import { resolvePartPath } from "./part-path";

export const writeCachedPart = async (context: RegistryContext, id: string, partName: string, text: string) => {
  const file = resolvePartPath(context.dir, id, partName);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, text);
  await recordCacheEntry(context, file, text);
};
