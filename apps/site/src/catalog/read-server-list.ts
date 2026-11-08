export const readServerList = (body: unknown) => {
  if (typeof body !== "object" || body === null) {
    throw new Error("index.json is not an object");
  }
  const servers = (body as Record<string, unknown>).servers;
  if (!Array.isArray(servers)) {
    throw new Error('index.json has no "servers" list');
  }
  const list: unknown[] = servers;
  return list;
};
