export interface UpstreamOptions {
  /** Request headers of an HTTP upstream, already signed by the manifest's auth. */
  headers?: Readonly<Record<string, string>>;
  /** Environment of a stdio upstream's child, on top of a minimal inherited one. */
  env?: Readonly<Record<string, string>>;
  fetchImpl?: typeof fetch;
  clientVersion?: string;
}
