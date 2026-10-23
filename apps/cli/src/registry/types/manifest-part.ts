export interface ManifestPart {
  /** First segment of the tool names the part holds, for example `issues`. */
  name: string;
  /** Link to the part file, absolute or relative to the registry URL, like the index `url`. */
  url: string;
  /** Hex SHA-256 of the part file. */
  sha256: string;
}
