import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { resolvePartPath } from "./part-path";

export const writeCachedPart = async (dir: string, id: string, partName: string, text: string) => {
  const file = resolvePartPath(dir, id, partName);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, text);
};
