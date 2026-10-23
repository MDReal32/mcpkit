export const validateContentType = (request: Readonly<Record<string, unknown>>, location: string) => {
  const { contentType, bodyArg } = request;
  if (contentType === undefined) {
    return [];
  }
  if (typeof contentType !== "string" || contentType.trim() === "") {
    return [`${location}.request.contentType must be a non-empty string`];
  }
  if (contentType.startsWith("text/") && bodyArg === undefined) {
    return [`${location}.request.contentType ${contentType} requires bodyArg`];
  }
  return contentType === "multipart/form-data" && bodyArg !== undefined
    ? [`${location}.request.contentType ${contentType} cannot be combined with bodyArg`]
    : [];
};
