import type { Program } from "yargs-extended";
import { resolveUserDir } from "../../registry";
import { toAction } from "../to-action";
import type { UpdateOptions } from "../types/update-options";
import { updateManifests } from "../update/update-manifests";

export const updateCommand = (options: UpdateOptions) => updateManifests(options.registry);

export const registerUpdateCommand = (program: Program) => {
  program
    .command(
      "update",
      `Refresh the registry index and the manifests already cached in ${resolveUserDir()}; servers you have not used are not downloaded`,
    )
    .option("--registry [string]", {
      description: "Registry base URL (default: MCPKIT_REGISTRY, else the mcpkit registry)",
    })
    .action(toAction(updateCommand));
};
