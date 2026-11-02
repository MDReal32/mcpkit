import type { Program } from "yargs-extended";
import { EXIT_FAILURE, EXIT_SUCCESS } from "../const";
import { toAction } from "../to-action";
import { updateManifests } from "../update/update-manifests";
import { upgradeBinary } from "../update/upgrade-binary";

/** What the scheduled job runs: the cached manifests first, then the binary; a failure of one does not skip the other. */
export const upgradeCommand = async () => {
  const manifests = await updateManifests();
  const binary = await upgradeBinary();
  return manifests === EXIT_SUCCESS && binary === EXIT_SUCCESS ? EXIT_SUCCESS : EXIT_FAILURE;
};

export const registerUpgradeCommand = (program: Program) => {
  program
    .command("upgrade", "Update the cached manifests, then replace the installed binary with the latest release")
    .action(toAction(upgradeCommand));
};
