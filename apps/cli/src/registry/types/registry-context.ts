export interface RegistryContext {
  /** Folder holding the cached index and manifests. */
  dir: string;
  registryUrl: string;
  fetchImpl: typeof fetch;
  /** When false the cached index is used as it is, never re-checked on use. */
  revalidate: boolean;
  warn: (message: string) => void;
}
