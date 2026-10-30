import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { recordCacheEntry } from "../cache/record-cache-entry";
import { INDEX_FILE_NAME } from "../const";
import type { RegistryContext } from "../types/registry-context";
import type { RegistryIndex } from "../types/registry-index";

export const writeCachedIndex = async (context: RegistryContext, index: RegistryIndex) => {
  const file = join(context.dir, INDEX_FILE_NAME);
  const text = `${JSON.stringify(index, null, 2)}\n`;
  await mkdir(context.dir, { recursive: true });
  await writeFile(file, text);
  await recordCacheEntry(context, file, text);
};
