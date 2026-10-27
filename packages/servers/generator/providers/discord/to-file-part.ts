import type { OpenApiSchema } from "../../utils/types/open-api-schema";

export const toFilePart = (schema: OpenApiSchema) => {
  if (schema.contentEncoding !== "binary") {
    return schema;
  }
  const filePart: OpenApiSchema = { ...schema, format: "binary" };
  return filePart;
};
