import type { OpenApiSchema } from "../../utils/types/open-api-schema";

/** The v2 spec declares an uploaded file as an array of untyped items (`attachment`); one file is sent per part. */
export const toFilePart = (schema: OpenApiSchema) => {
  const isUntypedList = schema.type === "array" && schema.items?.type === undefined;
  if (!isUntypedList) {
    return schema;
  }
  const filePart: OpenApiSchema = { type: "string", format: "binary", description: schema.description };
  return filePart;
};
