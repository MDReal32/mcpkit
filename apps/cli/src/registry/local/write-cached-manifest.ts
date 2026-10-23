import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { resolveManifestPath } from "../ids/resolve-manifest-path";

export const writeCachedManifest = async (dir: string, id: string, text: string) => {
  const file = resolveManifestPath(dir, id);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, text);
};
