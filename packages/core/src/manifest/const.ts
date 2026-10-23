import type { AuthType } from "./types/auth/auth-type";

export const SERVER_NAME_PATTERN = /^[a-z][a-z0-9_]*$/;

/** `resource:action`, for example `pull_request:list`; the action part is optional. */
export const TOOL_NAME_PATTERN = /^[a-z][a-z0-9_]*(:[a-z][a-z0-9_]*)*$/;

export const SERVER_CATEGORY_PATTERN = /^[a-z][a-z0-9-]*$/;

export const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

export const AUTH_REQUIRED_KEYS: Readonly<Record<AuthType, readonly string[]>> = {
  none: [],
  bearer: ["env"],
  header: ["env", "name"],
  query: ["env", "name"],
  basic: ["usernameEnv", "passwordEnv"],
  oauth: ["authorizationUrl", "tokenUrl", "clientId"],
};

export const AUTH_TYPES = Object.keys(AUTH_REQUIRED_KEYS);

export const MAX_PORT = 65_535;

export const INTERACTIVE_AUTH_TYPES = ["oauth"] as const;

export const DOMAIN_PLACEHOLDER = "{domain}";

/** A host with an optional port and path, for example `ghe.example.com/api/v3`. */
export const DOMAIN_VALUE_PATTERN = /^[a-z0-9]([a-z0-9.-]*[a-z0-9])?(:\d{1,5})?(\/[a-z0-9._~-]+)*$/i;

export const DOMAIN_SAMPLE_VALUE = "example.com";

export const EDITION_NAME_PATTERN = /^[a-z][a-z0-9-]*$/;
