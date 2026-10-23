/** One running server process; `handshakeResponse` is the answer to the replayed initialize request. */
export interface Worker {
  send: (line: string) => void;
  finish: () => void;
  kill: () => void;
  handshakeResponse: Promise<string>;
  exited: Promise<number>;
}
