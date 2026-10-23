import type { JsonSchema } from '@usemcpkit/core';
import { cleanDescription } from './clean-description.ts';
import { MAX_SCHEMA_DEPTH } from './const.ts';
import { mergeVariants } from './merge-variants.ts';
import { pickType } from './pick-type.ts';
import type { OpenApiSchema } from './types/open-api-schema.ts';

const isPrimitive = (value: unknown) => ['string', 'number', 'boolean'].includes(typeof value);

const isObjectLike = (schema: OpenApiSchema) => pickType(schema) === 'object' || Boolean(schema.properties);

const hasObjectVariants = (schema: OpenApiSchema) =>
  [...(schema.allOf ?? []), ...(schema.oneOf ?? []), ...(schema.anyOf ?? [])].some(isObjectLike);

const sharedScalarType = (schema: OpenApiSchema) => {
  const types = [...(schema.oneOf ?? []), ...(schema.anyOf ?? [])].map(pickType);
  const [first] = types;
  if (types.every((type) => type === first)) {
    return first;
  }
  return types.includes('string') ? 'string' : undefined;
};

export const convertSchema = (source: OpenApiSchema, depth = 0): JsonSchema => {
  const schema = hasObjectVariants(source) ? mergeVariants(source) : source;
  const result: { -readonly [K in keyof JsonSchema]: JsonSchema[K] } = {};
  const type = pickType(schema) ?? (schema.properties ? 'object' : sharedScalarType(schema));
  if (type) {
    result.type = type as JsonSchema['type'];
  }
  const description = cleanDescription(schema.description);
  if (description) {
    result.description = description;
  }
  if (isPrimitive(schema.default)) {
    result.default = schema.default;
  }
  const values = schema.enum?.filter((value) => value !== null);
  if (values && values.length > 0) {
    result.enum = values;
  }
  if (type === 'array' && schema.items) {
    result.items = convertSchema(schema.items, depth + 1);
  }
  const sourceProperties = schema.properties ?? {};
  if (type === 'object' && Object.keys(sourceProperties).length > 0 && depth < MAX_SCHEMA_DEPTH) {
    result.properties = Object.fromEntries(
      Object.entries(sourceProperties).map(([name, property]) => [name, convertSchema(property, depth + 1)]),
    );
    const required = (schema.required ?? []).filter((name) => name in sourceProperties);
    if (required.length > 0) {
      result.required = required;
    }
  }
  return result;
};
