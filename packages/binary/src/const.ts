export const BIN_DIR_NAME = "bin";

export const UPDATE_STATE_FILE_NAME = "update-state.json";

export const UPDATE_CHECK_INTERVAL_MS = 6 * 60 * 60_000;

export const DEFAULT_NPM_REGISTRY = "https://registry.npmjs.org";

export const NPM_REGISTRY_ENV = "USEMCPKIT_NPM_REGISTRY";

/** Set to `0` to stop `serve` from replacing the installed binary with newer releases and from scheduling `usemcpkit upgrade`. */
export const AUTO_UPDATE_ENV = "USEMCPKIT_AUTO_UPDATE";

export const LATEST_TAG = "latest";

/** Abbreviated npm metadata: only dist-tags and per-version dist info. */
export const NPM_METADATA_ACCEPT = "application/vnd.npm.install-v1+json";

export const METADATA_TIMEOUT_MS = 30_000;

export const DOWNLOAD_TIMEOUT_MS = 5 * 60_000;

export const EXECUTABLE_MODE = 0o755;

export const TAR_BLOCK_SIZE = 512;

/** npm tarballs put every file under `package/`. */
export const TARBALL_ROOT = "package";

export const REPLACED_BINARY_SUFFIX = ".old";

export const SUPPORTED_INTEGRITY_ALGORITHMS: readonly string[] = ["sha512", "sha384", "sha256"];

export const TAR_NAME_FIELD = { offset: 0, length: 100 } as const;

export const TAR_SIZE_FIELD = { offset: 124, length: 12 } as const;

export const TAR_TYPE_OFFSET = 156;

export const TAR_PREFIX_FIELD = { offset: 345, length: 155 } as const;

/** Regular-file type flags: `0` and the pre-POSIX NUL. */
export const TAR_FILE_TYPES: readonly number[] = [0x30, 0x00];

export const NOT_FOUND_STATUS = 404;

/** `<prefix>/Cellar/usemcpkit/<version>/bin/usemcpkit`; Homebrew links `<prefix>/bin/usemcpkit` to the current version. */
export const HOMEBREW_CELLAR_PATTERN = /^(?<prefix>.+)\/Cellar\/usemcpkit\/[^/]+\/bin\/usemcpkit$/;

export const HOMEBREW_UPGRADE_COMMAND = "brew upgrade usemcpkit";

/**
 * `…\WinGet\Packages\<PackageIdentifier>_<source>\usemcpkit.exe`; winget names a portable binary after its command
 * (`usemcpkit`) and upgrades in place, so the folder stays the same.
 */
export const WINGET_PACKAGE_PATTERN = /\\WinGet\\Packages\\(?<id>[^\\_]+)_[^\\]+\\(?:use)?usemcpkit\.exe$/i;
