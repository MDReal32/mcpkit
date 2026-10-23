import { readArgNames } from "./read-arg-names";

export const validateArgSpec = (spec: unknown, declaredArgs: ReadonlySet<string>, location: string) => {
  if (spec === undefined) {
    return [];
  }
  const names = readArgNames(spec);
  if (!names) {
    return [`${location} must be an array of arg names or an object of strings`];
  }
  return names.filter((name) => !declaredArgs.has(name)).map((name) => `${location} uses undeclared arg "${name}"`);
};
