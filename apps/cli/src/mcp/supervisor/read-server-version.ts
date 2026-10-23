import { isJsonObject } from '@mcpkit/core';
import { parseJsonLine } from '../rpc/parse-json-line';

export const readServerVersion = (initializeResponse: string) => {
  const data = parseJsonLine(initializeResponse);
  const result = isJsonObject(data) ? data.result : undefined;
  const serverInfo = isJsonObject(result) ? result.serverInfo : undefined;
  const version = isJsonObject(serverInfo) ? serverInfo.version : undefined;
  return typeof version === 'string' ? version : 'unknown';
};
