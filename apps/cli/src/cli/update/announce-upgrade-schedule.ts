import { describeError } from "@usemcpkit/core";
import { printError } from "../output/print-error";
import { printLine } from "../output/print-line";
import { scheduleUpgrades } from "./schedule-upgrades";

/** Install-time scheduling; a failure is reported but does not fail the install, since `serve` still checks daily. */
export const announceUpgradeSchedule = async () => {
  try {
    const changed = await scheduleUpgrades();
    if (changed) {
      printLine('Scheduled "mcpkit upgrade" to run every few hours.');
    }
  } catch (error) {
    printError(`Could not schedule upgrades: ${describeError(error)}`);
  }
};
