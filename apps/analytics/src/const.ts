export const MAX_BODY_BYTES = 1024;

export const TOOL_ID_PATTERN = /^[a-z0-9_.-]+(:[a-z0-9_.-]+){1,6}$/i;

export const VERSION_PATTERN = /^[0-9a-z.+-]{1,32}$/i;

export const OS_NAMES: readonly string[] = ["darwin", "linux", "win32"];

export const MAX_TOOL_LENGTH = 200;

export const INCREMENT_USAGE_SQL = `INSERT INTO usage (day, tool, version, os, count) VALUES (?, ?, ?, ?, 1)
ON CONFLICT (day, tool, version, os) DO UPDATE SET count = count + 1`;
