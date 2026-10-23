export const validateContentType = (request: Readonly<Record<string, unknown>>, location: string) => {
  const { contentType, bodyArg } = request;
  if (contentType === undefined) {
    return [];
  }
  if (typeof contentType !== "string" || contentType.trim() === "") {
    return [`${location}.request.contentType must be a non-empty string`];
  }
  return contentType.startsWith("text/") && bodyArg === undefined
    ? [`${location}.request.contentType ${contentType} requires bodyArg`]
    : [];
};
