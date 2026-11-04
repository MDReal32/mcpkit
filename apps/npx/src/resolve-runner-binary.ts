import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { RUNNER_BINARY_PATH } from "./const";
import { listPlatformPackages } from "./list-platform-packages";
import { tryResolveModule } from "./try-resolve-module";

/** The `usemcpkit` binary of the platform package npm installed for this machine, or undefined when there is none. */
export const resolveRunnerBinary = (platform: NodeJS.Platform = process.platform, arch: string = process.arch) => {
  const require = createRequire(import.meta.url);
  const extension = platform === "win32" ? ".exe" : "";
  for (const name of listPlatformPackages(platform, arch)) {
    const packageJson = tryResolveModule(require, `${name}/package.json`);
    if (packageJson !== undefined) {
      return join(dirname(packageJson), `${RUNNER_BINARY_PATH}${extension}`);
    }
  }
  return undefined;
};
