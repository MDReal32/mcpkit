import { copyFile, mkdir, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { SEEDED_MANIFESTS } from "./const.ts";

/**
 * A fresh `USEMCPKIT_HOME` whose manifest cache (`manifests/<versionDir>`, the folder of the binary under test) holds
 * {@link SEEDED_MANIFESTS} from the built registry.
 */
export const seedHome = async (registryDir: string, versionDir: string) => {
  const home = await mkdtemp(join(tmpdir(), "usemcpkit-smoke-"));
  for (const file of SEEDED_MANIFESTS) {
    const target = join(home, "manifests", versionDir, file);
    await mkdir(dirname(target), { recursive: true });
    await copyFile(join(registryDir, file), target);
  }
  return home;
};
