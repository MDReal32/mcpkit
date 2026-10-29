export const TOKENS_FILE_NAME = "tokens.json";

export const DEFAULT_REDIRECT_PORT = 8976;

export const LOOPBACK_HOST = "127.0.0.1";

export const CALLBACK_PATH = "/callback";

export const SIGN_IN_TIMEOUT_MS = 5 * 60_000;

export const TOKEN_REQUEST_TIMEOUT_MS = 30_000;

/** Tokens this close to expiry are refreshed before use. */
export const EXPIRY_SKEW_MS = 60_000;

export const RANDOM_TOKEN_BYTES = 32;

export const CALLBACK_PAGE =
  '<!doctype html><meta charset="utf-8"><title>mcpkit</title><p>mcpkit received the authorization. You can close this window.</p>';

export const PRIVATE_DIR_MODE = 0o700;

export const PRIVATE_FILE_MODE = 0o600;

export const MS_PER_SECOND = 1000;

/** HTTP contract between the CLI's loopback credentials form server and the page it serves. */
export const CREDENTIALS_FORM_API = {
  submit: "/api/submit",
  cancel: "/api/cancel",
  import: "/api/import",
} as const;

export const CREDENTIALS_REQUEST_ELEMENT_ID = "mcpkit-request";

/**
 * Functions the CLI's native form window binds into the page: close it, fit it to `{ width, height }`, and open a link
 * in the default browser (a webview has no tabs, so `target="_blank"` links go nowhere).
 */
export const FORM_WINDOW_BINDINGS = {
  close: "mcpkitCloseWindow",
  fit: "mcpkitFitWindow",
  openLink: "mcpkitOpenLink",
} as const;

export const CREDENTIALS_FORM_SESSION_HEADER = "X-Mcpkit-Session";

export const CONFIG_FILE_NAME = "config.json";

export const SECRETS_FILE_NAME = "secrets.json";

/** The host key of a server that has no domain, so its credentials still live under `hosts`. */
export const DEFAULT_HOST_KEY = "default";

export const GIT_COMMAND_TIMEOUT_MS = 3000;

/** The category of the servers that existed before the config grouped them by category. */
export const LEGACY_SERVER_CATEGORIES: Readonly<Record<string, string>> = {
  confluence: "atlassian",
  jira: "atlassian",
  github: "git",
  gitlab: "git",
};

export const UNKNOWN_CATEGORY = "other";
