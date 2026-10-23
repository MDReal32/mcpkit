export const validateFileArgs = (fileArgs: unknown, declaredArgs: ReadonlySet<string>, location: string) => {
  if (fileArgs === undefined) {
    return [];
  }
  if (!Array.isArray(fileArgs)) {
    return [`${location} must be an array of argument names`];
  }
  return fileArgs
    .filter((name) => typeof name !== "string" || !declaredArgs.has(name))
    .map((name) => `${location} names an undeclared arg: ${String(name)}`);
};
