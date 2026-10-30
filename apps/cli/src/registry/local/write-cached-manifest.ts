import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { recordCacheEntry } from "../cache/record-cache-entry";
import { resolveManifestPath } from "../ids/resolve-manifest-path";
import type { RegistryContext } from "../types/registry-context";

export const writeCachedManifest = async (context: RegistryContext, id: string, text: string) => {
  const file = resolveManifestPath(context.dir, id);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, text);
  await recordCacheEntry(context, file, text);
};
