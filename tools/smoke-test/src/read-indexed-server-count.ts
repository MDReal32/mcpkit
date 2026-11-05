import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { RegistryIndex } from "./types/registry-index.ts";

export const readIndexedServerCount = async (registryDir: string) => {
  const index: RegistryIndex = JSON.parse(await readFile(join(registryDir, "index.json"), "utf8"));
  return index.servers.length;
};
