import { rm } from "node:fs/promises";
import { join } from "node:path";
import {
  ASSETS_OUTPUT_DIR,
  BINARIES_ARTIFACT_PREFIX,
  NPM_OUTPUT_DIR,
  RELEASE_TARGETS,
  WRAPPER_PACKAGE_JSON,
} from "./const.ts";
import { readCargoVersion } from "./read-cargo-version.ts";
import { readWrapperPackageJson } from "./read-wrapper-package-json.ts";
import { writePlatformPackage } from "./write-platform-package.ts";
import { writeReleaseAssets } from "./write-release-assets.ts";
import { writeWrapperDependencies } from "./write-wrapper-dependencies.ts";

/**
 * Turns the per-target binaries CI built (`<binariesDir>/binaries-<target>/`) into the npm platform packages
 * (`<outputDir>/npm`) and the GitHub Release assets (`<outputDir>/bin`), and points the npx wrapper at them. The
 * wrapper and the binaries are released at one version, so a wrapper version that differs from Cargo's fails.
 */
export const writeRelease = async (workspaceRoot: string, binariesDir: string, outputDir: string) => {
  const version = readCargoVersion(workspaceRoot);
  const wrapperFile = join(workspaceRoot, WRAPPER_PACKAGE_JSON);
  const wrapper = await readWrapperPackageJson(wrapperFile);
  if (wrapper.version !== version) {
    throw new Error(
      `${WRAPPER_PACKAGE_JSON} is at ${wrapper.version} but the Cargo workspace at ${version}; release both at one version`,
    );
  }
  await rm(outputDir, { recursive: true, force: true });
  for (const target of RELEASE_TARGETS) {
    const targetDir = join(binariesDir, `${BINARIES_ARTIFACT_PREFIX}${target.name}`);
    await writePlatformPackage(join(outputDir, NPM_OUTPUT_DIR), target, targetDir, version);
    await writeReleaseAssets(join(outputDir, ASSETS_OUTPUT_DIR), target, targetDir);
  }
  await writeWrapperDependencies(wrapperFile, wrapper, version);
  return version;
};
