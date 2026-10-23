import { awaitHandshake } from './await-handshake';
import { HANDSHAKE_REQUEST_ID, HANDSHAKE_TIMEOUT_MS, SYNTHETIC_INITIALIZE } from './const';
import { readServerVersion } from './read-server-version';
import { replaceLineId } from './replace-line-id';
import type { HandshakeRecord } from './types/handshake-record';
import type { Worker } from './types/worker';

/** Proves `worker` answers initialize, using the client's own handshake when there is one. Resolves to its version. */
export const replayHandshake = async (worker: Worker, record: HandshakeRecord) => {
  const initialize = record.initialize ? replaceLineId(record.initialize, HANDSHAKE_REQUEST_ID) : SYNTHETIC_INITIALIZE;
  worker.send(initialize);
  const version = readServerVersion(await awaitHandshake(worker, HANDSHAKE_TIMEOUT_MS));
  if (record.initialized) {
    worker.send(record.initialized);
  }
  return version;
};
