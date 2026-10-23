import type { OpenApiSchema } from '../types/open-api-schema.ts';
import type { SchemaOptions } from '../types/schema-options.ts';
import { pickType } from './pick-type.ts';

export const sharedScalarType = (schema: OpenApiSchema, options: SchemaOptions) => {
  const types = [...(schema.oneOf ?? []), ...(schema.anyOf ?? [])].map(pickType);
  const [first] = types;
  if (types.every((type) => type === first)) {
    return first;
  }
  return options.widenMixedScalarsToString && types.includes('string') ? 'string' : undefined;
};
