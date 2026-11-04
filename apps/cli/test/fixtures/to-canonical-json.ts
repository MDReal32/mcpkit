/** JSON with every object's keys sorted, so two encoders that order keys differently give the same text. */
export const toCanonicalJson = (value: unknown): string => {
  if (Array.isArray(value)) {
    return `[${value.map(toCanonicalJson).join(",")}]`;
  }
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value)
      .filter(([, item]) => item !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : 1));
    return `{${entries.map(([key, item]) => `${JSON.stringify(key)}:${toCanonicalJson(item)}`).join(",")}}`;
  }
  return JSON.stringify(value);
};
