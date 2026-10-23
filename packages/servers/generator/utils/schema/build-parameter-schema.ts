import type { JsonSchema } from '@usemcpkit/core';
import type { OpenApiParameter } from '../types/open-api-operation';
import type { SchemaOptions } from '../types/schema-options';
import { cleanDescription } from './clean-description';
import { convertSchema } from './convert-schema';

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
