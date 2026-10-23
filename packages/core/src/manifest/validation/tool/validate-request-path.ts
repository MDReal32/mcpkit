export const validateRequestPath = (path: unknown, declaredArgs: ReadonlySet<string>, location: string) => {
  if (typeof path !== "string" || !path.startsWith("/")) {
    return [`${location}.request.path must start with "/"`];
  }
  return [...path.matchAll(/\{(\w+)\}/g)]
    .map((match) => match[1] ?? "")
    .filter((name) => !declaredArgs.has(name))
    .map((name) => `${location}.request.path uses undeclared arg "${name}"`);
};
