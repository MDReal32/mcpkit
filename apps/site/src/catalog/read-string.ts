export const readString = (record: Record<string, unknown>, key: string, position: number) => {
  const value = record[key];
  if (typeof value !== "string") {
    throw new Error(`index.json: server ${position} has no string "${key}"`);
  }
  return value;
};
