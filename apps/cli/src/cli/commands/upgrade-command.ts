import {
  createBinaryContext,
  detectPackageManagerInstall,
  resolveInstalledBinaryPath,
  updateBinary,
} from "@usemcpkit/binary";
import { pathExists } from "@usemcpkit/clients";
import type { Program } from "yargs-extended";
import { EXIT_FAILURE, EXIT_SUCCESS } from "../const";
import { printError } from "../output/print-error";
import { printLine } from "../output/print-line";
import { toAction } from "../to-action";
import { readBinaryVersion } from "../update/read-binary-version";

/** Homebrew and winget installs are left to their package manager. Otherwise replaces ~/.mcpkit/bin/mcpkit with the latest published release now, instead of waiting for the daily check. */
export const upgradeCommand = async () => {
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

export const registerUpgradeCommand = (program: Program) => {
  program
    .command("upgrade", "Replace the installed binary with the latest release now")
    .action(toAction(upgradeCommand));
};
