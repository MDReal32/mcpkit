export interface CheckProgress {
  /** The typed host has a version probe and differs from the one the form opened with. */
  canCheck: boolean;
  /** Check answered for the typed host. */
  answered: boolean;
  /** Check failed for the typed host. */
  failed: boolean;
}
