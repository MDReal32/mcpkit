export const MAX_BODY_BYTES = 1024;

/** `/api/v1/use` is the current path; CLIs of `0.9.0` still post to `/v1/use`. */
export const USAGE_PATHS: ReadonlySet<string> = new Set(["/api/v1/use", "/v1/use"]);

export const INCREMENT_USAGE_SQL = `INSERT INTO usage (tool, count) VALUES (?, 1)
ON CONFLICT (tool) DO UPDATE SET count = count + 1`;
