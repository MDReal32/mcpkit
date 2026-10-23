export { AUTO_UPDATE_ENV, NPM_REGISTRY_ENV } from "./const";
export { createBinaryContext } from "./install/create-binary-context";
export { detectPackageManagerInstall } from "./install/detect-package-manager-install";
export { findPackageManagerInstall } from "./install/find-package-manager-install";
export { installBinary } from "./install/install-binary";
export { isCompiledBinary } from "./install/is-compiled-binary";
export { resolveInstalledBinaryPath } from "./install/resolve-installed-binary-path";
export type { NpmPlatform, Target } from "./platform";
export {
  BINARY_NAME,
  detectTarget,
  isTarget,
  PLATFORM_PACKAGE_BIN_DIR,
  TARGETS,
  toBinaryFileName,
  toNpmPlatform,
  toPlatformPackageName,
} from "./platform";
export { readPackageRelease } from "./release/read-package-release";
export { verifyIntegrity } from "./release/verify-integrity";
export { extractTarFile } from "./tar/extract-tar-file";
export type { BinaryContext } from "./types/binary-context";
export type { BinaryUpdateResult } from "./types/binary-update-result";
export type { InstalledBinary } from "./types/installed-binary";
export type { PackageManagerInstall } from "./types/package-manager-install";
export { autoUpdateBinary } from "./update/auto-update-binary";
export { updateBinary } from "./update/update-binary";
