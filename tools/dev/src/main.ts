import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildAll } from "./build-all";
import { checkPrerequisites } from "./check-prerequisites";
import { DEFAULT_ARGS, NO_BUILD_ENV, NO_BUILD_FLAG, UPDATE_COMMAND } from "./const";
import { installBinaries } from "./install-binaries";
import { resolveDevPaths } from "./resolve-dev-paths";
import { runUsemcpkit } from "./run-usemcpkit";
import { startRegistryServer } from "./start-registry-server";

const [firstArg, ...restArgs] = process.argv.slice(2);
const skipBuild = firstArg === NO_BUILD_FLAG || process.env[NO_BUILD_ENV] === "1";
const given = firstArg === NO_BUILD_FLAG ? restArgs : process.argv.slice(2);
const args = given.length === 0 ? DEFAULT_ARGS : given;
const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const paths = resolveDevPaths(workspaceRoot);
if (!skipBuild) {
  await checkPrerequisites(workspaceRoot);
  await buildAll(workspaceRoot);
}
await installBinaries(paths);
const registry = await startRegistryServer(paths.registryDir);
try {
  process.stderr.write(`usemcpkit:dev home ${paths.home}, registry ${paths.registryDir}\n`);
  if (args[0] !== UPDATE_COMMAND) {
    const updated = await runUsemcpkit(paths, registry.url, [UPDATE_COMMAND], true);
    if (updated !== 0) {
      process.exitCode = updated;
    }
  }
  if (process.exitCode === undefined) {
    process.exitCode = await runUsemcpkit(paths, registry.url, args, false);
  }
} finally {
  await registry.close();
}
