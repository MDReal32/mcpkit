/** A downloaded manifest differs from what the index lists, usually because the cached index is older than the registry. */
export class ChecksumMismatchError extends Error {}
