import {
  createBinaryContext,
  detectPackageManagerInstall,
  resolveInstalledBinaryPath,
  updateBinary,
} from "@usemcpkit/binary";
import { pathExists } from "@usemcpkit/clients";
import { EXIT_FAILURE, EXIT_SUCCESS } from "../const";
import { printError } from "../output/print-error";
import { printLine } from "../output/print-line";
import { readBinaryVersion } from "./read-binary-version";

/** Homebrew and winget installs are left to their package manager. Otherwise replaces ~/.mcpkit/bin/mcpkit with the latest published release. */
export const upgradeBinary = async () => {
  const managed = await detectPackageManagerInstall();
  if (managed) {
    printLine(`mcpkit was installed with ${managed.manager}; update it with "${managed.upgradeCommand}"`);
    return EXIT_SUCCESS;
  }
  const context = await createBinaryContext();
  const path = resolveInstalledBinaryPath(context.target, context.env);
  if (!(await pathExists(path))) {
    printError(`mcpkit is not installed at ${path}: run "usemcpkit install" first`);
    return EXIT_FAILURE;
  }
  const result = await updateBinary(context, path, await readBinaryVersion(path));
  printLine(
    result.status === "updated"
      ? `updated ${result.from} -> ${result.to}. Restart the clients to use it.`
      : `mcpkit ${result.version} is the latest version`,
  );
  return EXIT_SUCCESS;
};
