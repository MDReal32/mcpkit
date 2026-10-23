import { JSON_CONTENT_TYPE } from './const.ts';
import { convertSchema } from './convert-schema.ts';
import type { Operation } from './types/operation.ts';

export const findUnsupportedReason = ({ method, spec }: Operation) => {
  const content = method === 'get' ? undefined : spec.requestBody?.content;
  if (!content) {
    return undefined;
  }
  const schema = content[JSON_CONTENT_TYPE]?.schema;
  if (!schema) {
    return `request body is ${Object.keys(content).join(', ')}, only JSON bodies are supported`;
  }
  if (Object.keys(convertSchema(schema).properties ?? {}).length === 0) {
    return 'request body has no named properties';
  }
  return undefined;
};
