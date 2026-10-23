const TABLE_HEADER_PATTERN = /^\s*\[([^[\]]+)\]\s*(?:#.*)?$/;

/** The dotted key of a `[table]` header line with whitespace removed, or undefined for any other line. */
export const readTomlHeader = (line: string) => TABLE_HEADER_PATTERN.exec(line)?.[1]?.replace(/\s+/g, '');
