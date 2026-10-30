export interface CacheEntry {
  /** Epoch milliseconds when the cached content last changed; for a file cached before the map existed, when it was first noted. */
  updatedAt: number;
  /** Epoch milliseconds when the content was last written or confirmed current. */
  checkedAt: number;
  /** Hex SHA-256 of the cached file. */
  sha256: string;
}
