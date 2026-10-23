import type { JsonSchema } from '@usemcpkit/core';
import type { OpenApiParameter } from '../types/open-api-operation.ts';
import type { SchemaOptions } from '../types/schema-options.ts';
import { cleanDescription } from './clean-description.ts';
import { convertSchema } from './convert-schema.ts';

export const buildParameterSchema = (parameter: OpenApiParameter, options: SchemaOptions): JsonSchema => {
  const schema = parameter.schema ?? {};
  const description = cleanDescription(parameter.description ?? schema.description, options.stripBold);
  if (schema.type === 'array') {
    const suffix = '(comma-separated)';
    return { type: 'string', description: description ? `${description} ${suffix}` : suffix };
  }
  const converted = convertSchema(schema, options);
  return description ? { ...converted, description } : converted;
};
