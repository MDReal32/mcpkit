export const validateCommaQuery = (keys: unknown, location: string) => {
  if (keys === undefined) {
    return [];
  }
  return Array.isArray(keys) && keys.every((key) => typeof key === "string")
    ? []
    : [`${location} must be an array of strings`];
};
