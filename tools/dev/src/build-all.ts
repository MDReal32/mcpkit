import { CARGO_PACKAGES, MANIFESTS_WORKSPACE } from "./const.ts";
import { runCommand } from "./run-command.ts";

export const buildAll = async (workspaceRoot: string) => {
  process.stderr.write("usemcpkit:dev building the binaries and the manifests\n");
  const packages = CARGO_PACKAGES.flatMap((name) => ["-p", name]);
  await runCommand("cargo", ["build", "--release", ...packages], workspaceRoot);
  await runCommand("yarn", ["workspace", MANIFESTS_WORKSPACE, "build"], workspaceRoot);
};
