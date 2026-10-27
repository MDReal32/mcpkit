import { MULTIPART_CONTENT_TYPE } from "../const";
import type { OpenApiRequestBody } from "../types/open-api-operation";
import type { OpenApiSchema } from "../types/open-api-schema";

/** Rewrites each named part of a `multipart/form-data` body, for specs that describe file parts in their own way. */
export const mapMultipartParts = (
  requestBody: OpenApiRequestBody | undefined,
  mapPart: (part: OpenApiSchema) => OpenApiSchema,
) => {
  const schema = requestBody?.content[MULTIPART_CONTENT_TYPE]?.schema;
  if (!requestBody || !schema?.properties) {
    return requestBody;
  }
  const properties = Object.fromEntries(
    Object.entries(schema.properties).map(([name, property]) => [name, mapPart(property)]),
  );
  const multipart: OpenApiRequestBody = {
    ...requestBody,
    content: { ...requestBody.content, [MULTIPART_CONTENT_TYPE]: { schema: { ...schema, properties } } },
  };
  return multipart;
};
