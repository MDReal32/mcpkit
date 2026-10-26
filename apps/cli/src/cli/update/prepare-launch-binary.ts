import { createBinaryContext, detectPackageManagerInstall, installBinary } from "@usemcpkit/binary";
import { pathExists } from "@usemcpkit/clients";
import { VERSION } from "../../version";
import { printLine } from "../output/print-line";
import type { LaunchBinary } from "../types/launch-binary";

/** A Homebrew or winget binary is used where it is so its package manager keeps updating it; any other binary is copied to ~/.mcpkit/bin. */
export const prepareLaunchBinary = async (binaryPath: string | undefined) => {
  const managed = binaryPath === undefined ? await detectPackageManagerInstall() : undefined;
  if (managed) {
    if (!(await pathExists(managed.path))) {
      throw new Error(`${managed.path} does not exist; relink mcpkit with ${managed.manager} and run "usemcpkit" again`);
    }
    printLine(`Using mcpkit ${VERSION} from ${managed.manager} at ${managed.path}`);
    const binary: LaunchBinary = { path: managed.path, updateHint: `Update it with "${managed.upgradeCommand}".` };
    return binary;
  }
  const installed = await installBinary(await createBinaryContext(), { path: binaryPath, version: VERSION });
  printLine(`mcpkit ${installed.version} installed at ${installed.path}`);
  const binary: LaunchBinary = { path: installed.path, updateHint: "It updates itself in the background." };
  return binary;
};
