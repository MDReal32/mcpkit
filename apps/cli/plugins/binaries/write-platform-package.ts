import { chmod, copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Target } from "@usemcpkit/binary";
import { PLATFORM_PACKAGE_BIN_DIR, toBinaryFileName, toNpmPlatform, toPlatformPackageName } from "@usemcpkit/binary";
import { PLATFORM_PACKAGE_LICENSE, PLATFORM_PACKAGE_REPOSITORY_URL } from "./const";
import type { PlatformPackageJson } from "./types/platform-package-json";

const EXECUTABLE_MODE = 0o755;

/** Lays out `<npmDir>/cli-<target>/` ready for `npm publish`; installs download it from the registry. */
export const writePlatformPackage = async (npmDir: string, target: Target, binaryFile: string, version: string) => {
  const packageDir = join(npmDir, `cli-${target}`);
  const binDir = join(packageDir, PLATFORM_PACKAGE_BIN_DIR);
  await mkdir(binDir, { recursive: true });
  const binaryPath = join(binDir, toBinaryFileName(target));
  await copyFile(binaryFile, binaryPath);
  await chmod(binaryPath, EXECUTABLE_MODE);
  const { os, cpu, libc } = toNpmPlatform(target);
  const packageJson: PlatformPackageJson = {
    name: toPlatformPackageName(target),
    version,
    description: `mcpkit standalone binary for ${target}`,
    license: PLATFORM_PACKAGE_LICENSE,
    repository: { type: "git", url: PLATFORM_PACKAGE_REPOSITORY_URL },
    publishConfig: { access: "public" },
    files: [PLATFORM_PACKAGE_BIN_DIR],
    os: [os],
    cpu: [cpu],
    ...(libc ? { libc: [libc] } : {}),
  };
  await writeFile(join(packageDir, "package.json"), `${JSON.stringify(packageJson, null, 2)}\n`);
  return packageDir;
};
