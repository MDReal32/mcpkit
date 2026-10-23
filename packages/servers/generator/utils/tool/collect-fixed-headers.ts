import type { OpenApiParameter } from "../types/open-api-operation";

export const collectFixedHeaders = (parameters: readonly OpenApiParameter[]) =>
  Object.fromEntries(
    parameters.flatMap(({ name, in: location, required, schema }) =>
      location === "header" && required && typeof schema?.default === "string" ? [[name, schema.default]] : [],
    ),
  );
