export const readErrorList = (body: unknown) => {
  if (typeof body === "object" && body !== null && "errors" in body && Array.isArray(body.errors)) {
    return body.errors.map(String);
  }
  return [];
};
