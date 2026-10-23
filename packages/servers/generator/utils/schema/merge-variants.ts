import type { OpenApiSchema } from '../types/open-api-schema';

/**
 * Flattens allOf (all variants apply) and oneOf/anyOf (any variant may apply, so nothing beyond the
 * intersection of the variants' required lists is required) into one object schema.
 */
export const mergeVariants = (schema: OpenApiSchema) => {
  const allOf = schema.allOf ?? [];
  const alternatives = schema.oneOf ?? schema.anyOf ?? [];
  const parts = [schema, ...allOf, ...alternatives];
  const properties = Object.assign({}, ...parts.map((part) => part.properties ?? {}));
  const alwaysRequired = [schema, ...allOf].flatMap((part) => part.required ?? []);
  const alternativeRequired = alternatives
    .map((variant) => variant.required ?? [])
    .reduce<string[] | undefined>(
      (shared, required) => (shared ? shared.filter((name) => required.includes(name)) : required),
      undefined,
    );
  const merged: OpenApiSchema = {
    ...schema,
    properties,
    required: [...new Set([...alwaysRequired, ...(alternativeRequired ?? [])])],
  };
  return merged;
};
