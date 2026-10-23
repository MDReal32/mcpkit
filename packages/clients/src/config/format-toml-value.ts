/** TOML basic strings accept JSON string escapes, so JSON.stringify yields valid TOML for strings and arrays. */
export const formatTomlValue = (value: unknown): string => {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(formatTomlValue).join(', ')}]`;
  }
  throw new Error(`cannot write ${typeof value} to TOML`);
};
