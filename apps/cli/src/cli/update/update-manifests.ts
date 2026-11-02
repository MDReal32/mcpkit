import { describeError } from "@usemcpkit/core";
import { syncRegistry } from "../../registry";
import { EXIT_FAILURE, EXIT_SUCCESS } from "../const";
import { describeSyncReport } from "../output/describe-sync-report";
import { printError } from "../output/print-error";
import { printLine } from "../output/print-line";

/** Refreshes the cached index and the manifests already on disk; a registry that cannot be reached is reported, not thrown. */
export const updateManifests = async (registryUrl?: string) => {
  try {
    const report = await syncRegistry({ registryUrl });
    describeSyncReport(report).forEach(printLine);
    return report.failed.length === 0 ? EXIT_SUCCESS : EXIT_FAILURE;
  } catch (error) {
    printError(`could not update the manifests: ${describeError(error)}`);
    return EXIT_FAILURE;
  }
};
