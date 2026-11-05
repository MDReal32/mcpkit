import { chmod, copyFile, mkdir } from "node:fs/promises";
import { extname, join } from "node:path";
import { EXECUTABLE_MODE, RELEASE_BINARIES } from "./const.ts";
import { toBinaryFileName } from "./to-binary-file-name.ts";
import type { ReleaseTarget } from "./types/release-target.ts";

/** Copies a target's binaries into `<assetsDir>` as `<binary>-<target>[.exe]`, the GitHub Release asset names. */
export const writeReleaseAssets = async (assetsDir: string, target: ReleaseTarget, binariesDir: string) => {
  await mkdir(assetsDir, { recursive: true });
  for (const binary of RELEASE_BINARIES) {
    const file = toBinaryFileName(target, binary);
    const destination = join(assetsDir, `${binary}-${target.name}${extname(file)}`);
    await copyFile(join(binariesDir, file), destination);
    await chmod(destination, EXECUTABLE_MODE);
  }
};
