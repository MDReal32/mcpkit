import { chmod, copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  EXECUTABLE_MODE,
  PLATFORM_PACKAGE_BIN_DIR,
  PLATFORM_PACKAGE_LICENSE,
  PLATFORM_PACKAGE_PREFIX,
  PLATFORM_PACKAGE_REPOSITORY_URL,
  RELEASE_BINARIES,
} from "./const.ts";
import { toBinaryFileName } from "./to-binary-file-name.ts";
import type { PlatformPackageJson } from "./types/platform-package-json.ts";
import type { ReleaseTarget } from "./types/release-target.ts";

/**
 * Lays out `<npmDir>/cli-<target>/` ready for `npm publish`, with both binaries in `bin/`. The executable bit is set
 * here because CI artifacts do not keep file modes.
 */
export const writePlatformPackage = async (
  npmDir: string,
  target: ReleaseTarget,
  binariesDir: string,
  version: string,
) => {
  const packageDir = join(npmDir, `cli-${target.name}`);
  const binDir = join(packageDir, PLATFORM_PACKAGE_BIN_DIR);
  await mkdir(binDir, { recursive: true });
  for (const binary of RELEASE_BINARIES) {
    const file = toBinaryFileName(target, binary);
    const destination = join(binDir, file);
    await copyFile(join(binariesDir, file), destination);
    await chmod(destination, EXECUTABLE_MODE);
  }
  const packageJson: PlatformPackageJson = {
    name: `${PLATFORM_PACKAGE_PREFIX}${target.name}`,
    version,
    description: `The usemcpkit binaries for ${target.name}`,
    license: PLATFORM_PACKAGE_LICENSE,
    repository: { type: "git", url: PLATFORM_PACKAGE_REPOSITORY_URL },
    publishConfig: { access: "public" },
    files: [PLATFORM_PACKAGE_BIN_DIR],
    os: [target.os],
    cpu: [target.cpu],
    ...(target.libc === undefined ? {} : { libc: [target.libc] }),
  };
  await writeFile(join(packageDir, "package.json"), `${JSON.stringify(packageJson, null, 2)}\n`);
};
