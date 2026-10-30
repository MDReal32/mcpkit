/** What is known about a finished clone, kept in its marker file. */
export interface RepoState {
  /** The repo spec the clone was prepared from; a different spec means a different clone. */
  signature: string;
  /** The commit the ref resolved to at checkout; unknown for a clone made before it was recorded. */
  commit?: string;
  /** Epoch milliseconds when the clone was last built. */
  updatedAt: number;
  /** Epoch milliseconds when the remote ref was last compared with `commit`. */
  checkedAt: number;
}
