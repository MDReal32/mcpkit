export const MANIFESTS_DIR_NAME = 'manifests';

export const FETCH_TIMEOUT_MS = 30_000;

/** Where CI publishes the compiled manifests (GitHub Pages of the repository). */
export const DEFAULT_REGISTRY_URL = 'https://mdreal32.github.io/mcpkit';

export const REGISTRY_ENV = 'MCPKIT_REGISTRY';

export const INDEX_FILE_NAME = 'index.json';

export const SYNC_MARKER_FILE_NAME = '.synced';

export const MANIFEST_SYNC_INTERVAL_MS = 24 * 60 * 60_000;

export const SERVER_ID_PATTERN = /^[a-z][a-z0-9-]*:[a-z][a-z0-9_]*$/;

export const SHA256_PATTERN = /^[0-9a-f]{64}$/;
