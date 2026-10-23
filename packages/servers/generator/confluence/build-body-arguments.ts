import type { JsonSchema } from '@usemcpkit/core';
import { BODY_KEY_PREFIX, JSON_CONTENT_TYPE } from './const.ts';
import { convertSchema } from './convert-schema.ts';
import { toArgName } from './to-arg-name.ts';
import type { OpenApiRequestBody } from './types/open-api-operation.ts';

export interface BodyArguments {
  /** Outgoing key -> argument name. */
  mapping: Record<string, string>;
  properties: Record<string, JsonSchema>;
  required: string[];
}

export const buildBodyArguments = (requestBody: OpenApiRequestBody, takenNames: ReadonlySet<string>) => {
  const schema = requestBody.content[JSON_CONTENT_TYPE]?.schema;
  if (!schema) {
    return undefined;
  }
  const converted = convertSchema(schema);
  const result: BodyArguments = { mapping: {}, properties: {}, required: [] };
  for (const [key, property] of Object.entries(converted.properties ?? {})) {
    const safeName = toArgName(key);
    const argName = takenNames.has(safeName) ? `${BODY_KEY_PREFIX}${safeName}` : safeName;
    result.mapping[key] = argName;
    result.properties[argName] = property;
    if (converted.required?.includes(key)) {
      result.required.push(argName);
    }
  }
  return result;
};
