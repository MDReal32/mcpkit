export interface UpstreamOptions {
  /** Request headers of an HTTP upstream, already signed by the manifest's auth. */
  headers?: Readonly<Record<string, string>>;
  /** Environment of a stdio upstream's child, on top of a minimal inherited one. */
  env?: Readonly<Record<string, string>>;
  /** Where a stdio upstream that runs from a repository keeps its clone; cloned there on first use. */
  repoDir?: string;
  /** Whether a clone at a branch or tag is compared with its remote and updated when it moved (default true). */
  checkRepo?: boolean;
  /** Where non-fatal problems, such as a failed update check, are reported (default stderr). */
  warn?: (message: string) => void;
  fetchImpl?: typeof fetch;
  clientVersion?: string;
}
