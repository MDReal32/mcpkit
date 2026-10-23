import { JSON_CONTENT_TYPE } from '../const.ts';
import type { ArgumentNaming } from '../types/argument-naming.ts';
import type { BodyArguments } from '../types/body-arguments.ts';
import type { OpenApiRequestBody } from '../types/open-api-operation.ts';
import type { SchemaOptions } from '../types/schema-options.ts';
import { convertSchema } from './convert-schema.ts';

export const buildBodyArguments = (
  requestBody: OpenApiRequestBody,
  takenNames: ReadonlySet<string>,
  schemaOptions: SchemaOptions,
  naming: ArgumentNaming,
) => {
  const schema = requestBody.content[JSON_CONTENT_TYPE]?.schema;
  if (!schema) {
    return undefined;
  }
  const converted = convertSchema(schema, schemaOptions);
  const result: BodyArguments = { mapping: {}, properties: {}, required: [] };
  const claimed = new Set<string>();
  for (const [key, property] of Object.entries(converted.properties ?? {})) {
    const argName = naming.bodyProperty(key, takenNames, claimed);
    claimed.add(argName);
    result.mapping[key] = argName;
    result.properties[argName] = property;
    if (converted.required?.includes(key)) {
      result.required.push(argName);
    }
  }
  return result;
};
