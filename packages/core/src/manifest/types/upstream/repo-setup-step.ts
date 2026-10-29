/** One program run inside the clone after checkout, such as an install or a build; no shell. */
export interface RepoSetupStep {
  /** A program name on PATH, never a path. */
  command: string;
  args?: readonly string[];
}
