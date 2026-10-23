import type { OpenApiSchema } from "../types/open-api-schema";

export const isBinarySchema = (schema: OpenApiSchema | undefined) => schema?.format === "binary";
