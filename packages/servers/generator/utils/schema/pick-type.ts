import type { OpenApiSchema } from "../types/open-api-schema";

const JSON_TYPES = ["string", "number", "integer", "boolean", "array", "object"];

export const pickType = (schema: OpenApiSchema) => {
  const candidates = Array.isArray(schema.type) ? schema.type : [schema.type];
  return candidates.find((candidate) => candidate !== undefined && JSON_TYPES.includes(candidate));
};
