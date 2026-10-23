export interface ManifestPart {
  /** First segment of the tool names the part holds, for example `issues`. */
  name: string;
  /** Relative to the registry URL. */
  path: string;
  /** Hex SHA-256 of the part file. */
  sha256: string;
}
