import { createBinaryContext, isInstalledBinary } from "@usemcpkit/binary";
import { describeError } from "@usemcpkit/core";
import { printError } from "../output/print-error";
import { scheduleUpgrades } from "./schedule-upgrades";

/** Fire-and-forget from `serve`, so installs from before the scheduled upgrade get one too; a failure never affects serving. */
export const startUpgradeSchedule = () => {
  const run = async () => {
    if (!isInstalledBinary(await createBinaryContext())) {
      return;
    }
    if (await scheduleUpgrades()) {
      printError('mcpkit: scheduled "mcpkit upgrade" to run every few hours');
    }
  };
  run().catch((error: unknown) => {
    printError(`mcpkit: could not schedule upgrades: ${describeError(error)}`);
  });
};
