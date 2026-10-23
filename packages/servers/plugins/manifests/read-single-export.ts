/** A server entry must have exactly one named export: the server definition. */
export const readSingleExport = (module: Readonly<Record<string, unknown>>) => {
  const names = Object.keys(module);
  const [name] = names;
  if (names.length !== 1 || name === undefined) {
    throw new Error(`expected exactly one named export, found ${names.length} (${names.join(", ") || "none"})`);
  }
  return module[name];
};
