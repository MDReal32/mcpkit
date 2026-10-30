export interface RepoOptions {
  /** When false a clone is never compared with its remote once it is built. */
  check: boolean;
  warn: (message: string) => void;
}
