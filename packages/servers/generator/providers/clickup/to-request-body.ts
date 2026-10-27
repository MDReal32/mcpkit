import { MULTIPART_CONTENT_TYPE } from "../../utils/const";
import type { OpenApiRequestBody } from "../../utils/types/open-api-operation";
import { toFilePart } from "./to-file-part";

export const toRequestBody = (requestBody: OpenApiRequestBody | undefined) => {
  const schema = requestBody?.content[MULTIPART_CONTENT_TYPE]?.schema;
  if (!requestBody || !schema?.properties) {
    return requestBody;
  }
  const properties = Object.fromEntries(
    Object.entries(schema.properties).map(([name, property]) => [name, toFilePart(property)]),
  );
  const multipart: OpenApiRequestBody = {
    ...requestBody,
    content: { ...requestBody.content, [MULTIPART_CONTENT_TYPE]: { schema: { ...schema, properties } } },
  };
  return multipart;
};
