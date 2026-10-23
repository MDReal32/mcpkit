import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { INDEX_FILE_NAME } from "../const";
import type { RegistryIndex } from "../types/registry-index";

export const writeCachedIndex = async (dir: string, index: RegistryIndex) => {
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, INDEX_FILE_NAME), `${JSON.stringify(index, null, 2)}\n`);
};
