import { createInterface } from 'node:readline';
import { describeError } from '@usemcpkit/core';
import { printError } from '../../cli/output/print-error';
import { TOOLS_LIST_CHANGED } from './const';
import { recordHandshakeLine } from './record-handshake-line';
import { replayHandshake } from './replay-handshake';
import { retireWorker } from './retire-worker';
import { spawnWorker } from './spawn-worker';
import type { HandshakeRecord } from './types/handshake-record';
import type { SuperviseOptions } from './types/supervise-options';
import type { Supervisor } from './types/supervisor';
import type { Worker } from './types/worker';
import type { WorkerLaunch } from './types/worker-launch';
import { watchBinaryFile } from './watch-binary-file';

/**
 * Owns the client's stdio and runs the real server as a child. `reload` starts a replacement, replays the
 * client's handshake to it, switches new requests over and announces `tools/list_changed`; the old child
 * finishes the requests it already has. A replacement that fails to start leaves the running server alone.
 */
export const superviseServe = async (
  launch: WorkerLaunch,
  { input = process.stdin, output = process.stdout, watchPath }: SuperviseOptions = {},
) => {
  let record: HandshakeRecord = {};
  let closing = false;
  let reloadQueue: Promise<void> = Promise.resolve();
  let finish: (code: number) => void = () => undefined;
  const done = new Promise<number>((resolve) => {
    finish = resolve;
  });
  const retired = new Set<Worker>();
  const forward = (line: string) => {
    output.write(`${line}\n`);
  };
  const start = () => {
    const worker = spawnWorker(launch, forward);
    void worker.exited.then((code) => {
      if (current === worker) {
        finish(code);
      }
    });
    return worker;
  };

  const reload = async () => {
    if (closing) {
      return;
    }
    const next = start();
    try {
      const version = await replayHandshake(next, record);
      printError(`mcpkit: reloaded, now serving ${version}`);
    } catch (error) {
      next.kill();
      printError(`mcpkit: reload failed, the running server stays: ${describeError(error)}`);
      return;
    }
    if (closing) {
      next.kill();
      return;
    }
    retireWorker(current, retired);
    current = next;
    if (record.initialize) {
      forward(JSON.stringify(TOOLS_LIST_CHANGED));
    }
  };
  const queueReload = () => {
    reloadQueue = reloadQueue.then(reload);
    return reloadQueue;
  };

  const stopWatching = watchPath ? await watchBinaryFile(watchPath, () => void queueReload()) : () => undefined;
  let current: Worker = start();
  const lines = createInterface({ input, crlfDelay: Infinity });
  lines.on('line', (line) => {
    record = recordHandshakeLine(record, line);
    current.send(line);
  });
  lines.once('close', () => {
    closing = true;
    stopWatching();
    current.finish();
    for (const worker of retired) {
      worker.kill();
    }
  });
  const supervisor: Supervisor = { reload: queueReload, done };
  return supervisor;
};
