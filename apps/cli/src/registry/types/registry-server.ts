export interface RegistryServer {
  /** `<category>:<name>`, for example `git:github`. */
  id: string;
  version: string;
  description?: string;
  /** Tool names only; schemas live in the manifest. */
  tools: readonly string[];
  /** Link to the manifest, absolute or relative to the registry URL. */
  url: string;
  /** Hex SHA-256 of the manifest file, the integrity check and the staleness check of the cached copy. */
  sha256: string;
}
