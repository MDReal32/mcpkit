export const SERVER_NAME_PATTERN = /^[a-z][a-z0-9_]*$/;

/** `resource:action`, for example `pull_request:list`; the action part is optional. */
export const TOOL_NAME_PATTERN = /^[a-z][a-z0-9_]*(:[a-z][a-z0-9_]*)*$/;

export const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

export const DOMAIN_PLACEHOLDER = "{domain}";

/** A host with an optional port and path, for example `ghe.example.com/api/v3`. */
export const DOMAIN_VALUE_PATTERN = /^[a-z0-9]([a-z0-9.-]*[a-z0-9])?(:\d{1,5})?(\/[a-z0-9._~-]+)*$/i;
