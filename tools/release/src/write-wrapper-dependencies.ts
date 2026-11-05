import { writeFile } from "node:fs/promises";
import { PLATFORM_PACKAGE_PREFIX, RELEASE_TARGETS } from "./const.ts";
import type { WrapperPackageJson } from "./types/wrapper-package-json.ts";

/**
 * Lists every platform package as an optional dependency of the npx wrapper at `version`, so npm installs the one of
 * the machine. It is written only in CI, right before packing: the lockfile cannot hold packages not published yet.
 */
export const writeWrapperDependencies = async (file: string, packageJson: WrapperPackageJson, version: string) => {
  const optionalDependencies = Object.fromEntries(
    RELEASE_TARGETS.map((target) => [`${PLATFORM_PACKAGE_PREFIX}${target.name}`, version]),
  );
  const updated: WrapperPackageJson = { ...packageJson, optionalDependencies };
  await writeFile(file, `${JSON.stringify(updated, null, 2)}\n`);
};
