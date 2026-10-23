export const validateSaveToArg = (saveToArg: unknown, declaredArgs: ReadonlySet<string>, location: string) => {
  if (saveToArg === undefined) {
    return [];
  }
  return typeof saveToArg === "string" && declaredArgs.has(saveToArg)
    ? []
    : [`${location}.request.saveToArg must name a declared arg`];
};
