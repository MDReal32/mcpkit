import type { JsonSchema } from '@usemcpkit/core';
import { JSON_CONTENT_TYPE } from './const.ts';
import { convertSchema } from './convert-schema.ts';
import { toArgumentName } from './to-argument-name.ts';
import type { OpenApiRequestBody } from './types/open-api-operation.ts';

export interface BodyArguments {
  /** Outgoing key -> argument name. */
  mapping: Record<string, string>;
  properties: Record<string, JsonSchema>;
  required: string[];
}

export const BODY_KEY_PREFIX = 'body_';

const pickArgumentName = (key: string, takenNames: ReadonlySet<string>, usedNames: ReadonlySet<string>) => {
  const base = toArgumentName(key);
  const candidate = takenNames.has(base) ? `${BODY_KEY_PREFIX}${base}` : base;
  return usedNames.has(candidate) ? `${candidate}_${usedNames.size}` : candidate;
};

export const buildBodyArguments = (requestBody: OpenApiRequestBody, takenNames: ReadonlySet<string>) => {
  const schema = requestBody.content[JSON_CONTENT_TYPE]?.schema;
  if (!schema) {
    return undefined;
  }
  const converted = convertSchema(schema);
  const result: BodyArguments = { mapping: {}, properties: {}, required: [] };
  const usedNames = new Set<string>();
  for (const [key, property] of Object.entries(converted.properties ?? {})) {
    const argName = pickArgumentName(key, takenNames, usedNames);
    usedNames.add(argName);
    result.mapping[key] = argName;
    result.properties[argName] = property;
    if (converted.required?.includes(key)) {
      result.required.push(argName);
    }
  }
  return result;
};
