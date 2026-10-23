import type { JsonSchema } from '@usemcpkit/core';
import type { OpenApiSchema } from '../types/open-api-schema.ts';
import type { SchemaOptions } from '../types/schema-options.ts';
import { cleanDescription } from './clean-description.ts';
import { mergeVariants } from './merge-variants.ts';
import { pickType } from './pick-type.ts';
import { sharedScalarType } from './shared-scalar-type.ts';

const isPrimitive = (value: unknown) => ['string', 'number', 'boolean'].includes(typeof value);

const isObjectLike = (schema: OpenApiSchema) => pickType(schema) === 'object' || Boolean(schema.properties);

const hasObjectVariants = (schema: OpenApiSchema) =>
  [...(schema.allOf ?? []), ...(schema.oneOf ?? []), ...(schema.anyOf ?? [])].some(isObjectLike);

export const convertSchema = (source: OpenApiSchema, options: SchemaOptions, depth = 0): JsonSchema => {
  const schema = hasObjectVariants(source) ? mergeVariants(source) : source;
  const result: { -readonly [K in keyof JsonSchema]: JsonSchema[K] } = {};
  const type = pickType(schema) ?? (schema.properties ? 'object' : sharedScalarType(schema, options));
  if (type) {
    result.type = type as JsonSchema['type'];
  }
  const description = cleanDescription(schema.description, options.stripBold);
  if (description) {
    result.description = description;
  }
  if (options.includeDefaults && isPrimitive(schema.default)) {
    result.default = schema.default;
  }
  const values = schema.enum?.filter((value) => value !== null);
  if (values && values.length > 0) {
    result.enum = values;
  }
  if (type === 'array' && schema.items) {
    result.items = convertSchema(schema.items, options, depth + 1);
  }
  const sourceProperties = schema.properties ?? {};
  if (type === 'object' && Object.keys(sourceProperties).length > 0 && depth < options.maxDepth) {
    result.properties = Object.fromEntries(
      Object.entries(sourceProperties).map(([name, property]) => [name, convertSchema(property, options, depth + 1)]),
    );
    const required = (schema.required ?? []).filter((name) => name in sourceProperties);
    if (required.length > 0) {
      result.required = required;
    }
  }
  return result;
};
