import { isJsonObject } from '@mcpkit/core';

export const hasJsonEntry = (data: unknown, serversPath: readonly string[], name: string) => {
  const servers = serversPath.reduce<unknown>((node, key) => (isJsonObject(node) ? node[key] : undefined), data);
  return isJsonObject(servers) && name in servers;
};
