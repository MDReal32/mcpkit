import { AUTO_UPDATE_ENV, createBinaryContext, ensureUpgradeSchedule } from "@usemcpkit/binary";

/** Resolves true when a new scheduled job was registered; skipped (undefined) when auto-update is turned off. */
export const scheduleUpgrades = async () => {
  const context = await createBinaryContext();
  if (context.env[AUTO_UPDATE_ENV] === "0") {
    return undefined;
  }
  return ensureUpgradeSchedule(context);
};
