import { isJsonObject } from '@mcpkit/core';
import { parseJsonLine } from '../rpc/parse-json-line';
import type { LineHeader } from './types/line-header';

export const readLineHeader = (line: string) => {
  const data = parseJsonLine(line);
  const header: LineHeader = {};
  if (!isJsonObject(data)) {
    return header;
  }
  header.id = data.id;
  if (typeof data.method === 'string') {
    header.method = data.method;
  }
  return header;
};
