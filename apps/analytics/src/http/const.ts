export const MAX_BODY_BYTES = 1024;

export const USAGE_PATH = "/v1/use";

export const INCREMENT_USAGE_SQL = `INSERT INTO usage (tool, count) VALUES (?, 1)
ON CONFLICT (tool) DO UPDATE SET count = count + 1`;
