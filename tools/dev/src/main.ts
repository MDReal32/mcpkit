import { resolve } from "node:path";
import { buildAll } from "./build-all.ts";
import { checkPrerequisites } from "./check-prerequisites.ts";
import { DEFAULT_ARGS, UPDATE_COMMAND } from "./const.ts";
import { installBinaries } from "./install-binaries.ts";
import { resolveDevPaths } from "./resolve-dev-paths.ts";
import { runUsemcpkit } from "./run-usemcpkit.ts";
import { startRegistryServer } from "./start-registry-server.ts";

const given = process.argv.slice(2);
const args = given.length === 0 ? DEFAULT_ARGS : given;
const workspaceRoot = resolve(process.cwd());
const paths = resolveDevPaths(workspaceRoot);
await checkPrerequisites(workspaceRoot);
await buildAll(workspaceRoot);
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
