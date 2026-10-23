import type { OpenApiSchema } from "../types/open-api-schema";
import type { SchemaOptions } from "../types/schema-options";
import { pickType } from "./pick-type";

export const sharedScalarType = (schema: OpenApiSchema, options: SchemaOptions) => {
  const types = [...(schema.oneOf ?? []), ...(schema.anyOf ?? [])].map(pickType);
  const [first] = types;
  if (types.every((type) => type === first)) {
    return first;
  }
  return options.widenMixedScalarsToString && types.includes("string") ? "string" : undefined;
};
