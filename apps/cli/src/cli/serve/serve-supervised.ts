import { superviseServe, WORKER_FLAG } from '../../mcp';
import { VERSION } from '../../version';
import { printError } from '../output/print-error';
import { startAutoUpdate } from '../update/start-auto-update';

/** The process the client starts: it keeps the connection, runs the real server as a worker and swaps it when the binary changes. */
export const serveSupervised = async (names: readonly string[]) => {
  printError(`mcpkit ${VERSION}: supervising the server, it reloads itself when this binary is replaced`);
  startAutoUpdate();
  const supervisor = await superviseServe(
    { command: process.execPath, args: ['serve', ...names, WORKER_FLAG] },
    { watchPath: process.execPath },
  );
  return supervisor.done;
};
