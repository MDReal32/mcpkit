export const validateBodyArg = (
  request: Readonly<Record<string, unknown>>,
  declaredArgs: ReadonlySet<string>,
  location: string,
) => {
  const { bodyArg, body, fixedBody } = request;
  if (bodyArg === undefined) {
    return [];
  }
  if (typeof bodyArg !== "string" || !declaredArgs.has(bodyArg)) {
    return [`${location}.request.bodyArg must name a declared arg`];
  }
  return body !== undefined || fixedBody !== undefined
    ? [`${location}.request.bodyArg cannot be combined with body or fixedBody`]
    : [];
};
