export interface Supervisor {
  reload: () => Promise<void>;
  /** Resolves to the exit code once the client closes input or the running worker exits. */
  done: Promise<number>;
}
