import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { BINARY_NAMES } from "./const.ts";
import type { DevPaths } from "./types/dev-paths.ts";

export const installBinaries = async (paths: DevPaths) => {
  const extension = process.platform === "win32" ? ".exe" : "";
  await mkdir(paths.binDir, { recursive: true, mode: 0o700 });
  await Promise.all(
    BINARY_NAMES.map((name) =>
      copyFile(join(paths.releaseDir, name + extension), join(paths.binDir, name + extension)),
    ),
  );
};
