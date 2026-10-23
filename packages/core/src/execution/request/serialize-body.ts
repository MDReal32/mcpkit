export const serializeBody = (payload: unknown, contentType: string) =>
  contentType.startsWith("text/") ? String(payload) : JSON.stringify(payload);
