import type { OpenApiSchema } from '../../utils/types/open-api-schema.ts';
import { SCHEMA_OPTIONS } from './const.ts';

const REF_PREFIX = '#/components/schemas/';

/** convertSchema never reads properties below the schema depth, and array items only one level further. */
const MAX_DEREFERENCE_DEPTH = SCHEMA_OPTIONS.maxDepth + 2;

export type SchemaIndex = Record<string, OpenApiSchema>;

const dereferenceAll = (schemas: OpenApiSchema[] | undefined, index: SchemaIndex, depth: number, trail: string[]) =>
  schemas?.map((schema) => dereferenceSchema(schema, index, depth, trail));

/**
 * Inlines `$ref`s down to the depth convertSchema reads. A reference that is already being resolved (a recursive
 * schema) becomes an empty schema instead of looping.
 */
export const dereferenceSchema = (schema: OpenApiSchema, index: SchemaIndex, depth = 0, trail: string[] = []) => {
  const resolve = (candidate: OpenApiSchema): OpenApiSchema => {
    if (!candidate.$ref) {
      return candidate;
    }
    const name = candidate.$ref.startsWith(REF_PREFIX) ? candidate.$ref.slice(REF_PREFIX.length) : candidate.$ref;
    const target = index[name];
    if (!target || trail.includes(name)) {
      return {};
    }
    return dereferenceSchema(target, index, depth, [...trail, name]);
  };

  if (schema.$ref) {
    return resolve(schema);
  }
  if (depth > MAX_DEREFERENCE_DEPTH) {
    return {};
  }
  const properties = schema.properties
    ? Object.fromEntries(
        Object.entries(schema.properties).map(([name, property]) => [
          name,
          dereferenceSchema(property, index, depth + 1, trail),
        ]),
      )
    : undefined;
  const result: OpenApiSchema = {
    ...schema,
    ...(properties && { properties }),
    ...(schema.items && { items: dereferenceSchema(schema.items, index, depth + 1, trail) }),
    ...(schema.allOf && { allOf: dereferenceAll(schema.allOf, index, depth, trail) }),
    ...(schema.oneOf && { oneOf: dereferenceAll(schema.oneOf, index, depth, trail) }),
    ...(schema.anyOf && { anyOf: dereferenceAll(schema.anyOf, index, depth, trail) }),
  };
  return result;
};
