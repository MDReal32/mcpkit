import { INITIALIZE_METHOD, INITIALIZED_METHOD } from "./const";
import { readLineHeader } from "./read-line-header";
import type { HandshakeRecord } from "./types/handshake-record";

export const recordHandshakeLine = (record: HandshakeRecord, line: string) => {
  const { method } = readLineHeader(line);
  if (method === INITIALIZE_METHOD) {
    const next: HandshakeRecord = { initialize: line };
    return next;
  }
  if (method === INITIALIZED_METHOD) {
    const next: HandshakeRecord = { ...record, initialized: line };
    return next;
  }
  return record;
};
