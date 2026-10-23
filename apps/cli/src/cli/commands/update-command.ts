import type { Program } from "yargs-extended";
import { resolveUserDir, syncRegistry } from "../../registry";
import { EXIT_FAILURE, EXIT_SUCCESS } from "../const";
import { describeSyncReport } from "../output/describe-sync-report";
import { printLine } from "../output/print-line";
import { toAction } from "../to-action";
import type { UpdateOptions } from "../types/update-options";

export const updateCommand = async (options: UpdateOptions) => {
  const report = await syncRegistry({ registryUrl: options.registry });
  describeSyncReport(report).forEach(printLine);
  return report.failed.length === 0 ? EXIT_SUCCESS : EXIT_FAILURE;
};

export const registerUpdateCommand = (program: Program) => {
  program
    .command("update", `Refresh the registry index and cached manifests in ${resolveUserDir()}`)
    .option("--registry [string]", {
      description: "Registry base URL (default: MCPKIT_REGISTRY, else the mcpkit registry)",
    })
    .action(toAction(updateCommand));
};
