import { isCompiledBinary } from "@usemcpkit/binary";
import { checkForUpdate } from "./check-for-update";
import { AUTO_UPDATE_RECHECK_INTERVAL_MS } from "./const";

/**
 * Fire-and-forget: checks once now and then every AUTO_UPDATE_RECHECK_INTERVAL_MS, so a server that stays up for
 * days still finds a new release; the binary decides whether its own check interval has passed.
 */
export const startAutoUpdate = () => {
  if (!isCompiledBinary()) {
    return;
  }
  void checkForUpdate();
  setInterval(checkForUpdate, AUTO_UPDATE_RECHECK_INTERVAL_MS).unref();
};
