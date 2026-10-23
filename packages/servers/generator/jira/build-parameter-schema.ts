import type { JsonSchema } from '@usemcpkit/core';
import { cleanDescription } from './clean-description.ts';
import { convertSchema } from './convert-schema.ts';
import type { OpenApiParameter } from './types/open-api-operation.ts';

export const buildParameterSchema = (parameter: OpenApiParameter): JsonSchema => {
  const schema = parameter.schema ?? {};
  const description = cleanDescription(parameter.description ?? schema.description);
  if (schema.type === 'array') {
    const suffix = '(comma-separated)';
    return { type: 'string', description: description ? `${description} ${suffix}` : suffix };
  }
  const converted = convertSchema(schema);
  return description ? { ...converted, description } : converted;
};
