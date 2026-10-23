export interface RegistryContext {
  /** Folder holding the cached index and manifests. */
  dir: string;
  registryUrl: string;
  fetchImpl: typeof fetch;
}
