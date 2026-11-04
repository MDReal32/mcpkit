/** The single entry usemcpkit owns in every client config; it serves every bundled server. */
export const ENTRY_NAME = "usemcpkit";

/** Entry names older releases wrote (the brand was `mcpkit`); installing replaces them and uninstalling removes them. */
export const LEGACY_ENTRY_NAMES: readonly string[] = ["mcpkit"];

/** The current entry name followed by the ones older releases wrote. */
export const OWNED_ENTRY_NAMES: readonly string[] = [ENTRY_NAME, ...LEGACY_ENTRY_NAMES];

export const SERVE_ARGS: readonly string[] = ["serve"];

export const BACKUP_SUFFIX = ".usemcpkit-backup";

export const JSON_INDENT_SIZE = 2;

export const NEW_CONFIG_FILE_MODE = 0o644;

/**
 * The Microsoft Store (MSIX) build of Claude Desktop keeps its data, `claude_desktop_config.json` included, in
 * `%LOCALAPPDATA%\Claude-Data\<package family name, lowercased>` and leaves only a marker file in `%APPDATA%\Claude`.
 */
export const CLAUDE_DESKTOP_STORE_DATA_DIR = ["Claude-Data", "anthropicpbc.claude_fnn82j28hfe8t"] as const;
