export interface Supervisor {
  reload: () => Promise<void>;
  /** Shuts down as if the client closed input: the worker gets its input closed, then is killed after a grace period. */
  stop: () => void;
  /** Resolves to the exit code once the client closes input or the running worker exits. */
  done: Promise<number>;
}
