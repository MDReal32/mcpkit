import { copyFile, mkdir, readFile, rename } from "node:fs/promises";
import { join } from "node:path";
import { BINARY_NAMES } from "./const";
import type { DevPaths } from "./types/dev-paths";

const readIfPresent = (file: string) => readFile(file).catch(() => undefined);

/** A binary is replaced by a rename, never overwritten in place: macOS kills (exit 137) a signed binary whose file was rewritten. */
export const installBinaries = async (paths: DevPaths) => {
  const extension = process.platform === "win32" ? ".exe" : "";
  await mkdir(paths.binDir, { recursive: true, mode: 0o700 });
  for (const name of BINARY_NAMES) {
    const source = join(paths.releaseDir, name + extension);
    const target = join(paths.binDir, name + extension);
    const [built, installed] = await Promise.all([readFile(source), readIfPresent(target)]);
    if (installed?.equals(built)) {
      continue;
    }
    const staged = `${target}.new`;
    await copyFile(source, staged);
    await rename(staged, target);
  }
};
