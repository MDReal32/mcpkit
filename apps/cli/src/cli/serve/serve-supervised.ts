import { superviseServe, WORKER_FLAG } from "../../mcp";
import { VERSION } from "../../version";
import { SHUTDOWN_SIGNALS } from "../const";
import { printError } from "../output/print-error";
import { startAutoUpdate } from "../update/start-auto-update";
import { startUpgradeSchedule } from "../update/start-upgrade-schedule";

/** The process the client starts: it keeps the connection, runs the real server as a worker and swaps it when the binary changes. */
export const serveSupervised = async (names: readonly string[]) => {
  printError(`mcpkit ${VERSION}: supervising the server, it reloads itself when this binary is replaced`);
  startAutoUpdate();
  startUpgradeSchedule();
  const supervisor = await superviseServe(
    { command: process.execPath, args: ["serve", ...names, WORKER_FLAG] },
    { watchPath: process.execPath },
  );
  for (const signal of SHUTDOWN_SIGNALS) {
    process.once(signal, supervisor.stop);
  }
  return supervisor.done;
};
