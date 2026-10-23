import { BINARY_CONTENT_TYPE, JSON_CONTENT_TYPE, MULTIPART_CONTENT_TYPE, TEXT_FALLBACK_SCHEMA } from "../const";
import type { OpenApiRequestBody } from "../types/open-api-operation";
import type { OpenApiSchema } from "../types/open-api-schema";
import type { SelectedBodyContent } from "../types/selected-body-content";

const BINARY_SCHEMA: OpenApiSchema = { type: "string", format: "binary" };

const isJsonLike = (contentType: string) => contentType.endsWith("+json");
const isText = (contentType: string) => contentType.startsWith("text/");

export const selectBodyContent = (content: OpenApiRequestBody["content"]): SelectedBodyContent | undefined => {
  const jsonSchema = content[JSON_CONTENT_TYPE]?.schema;
  if (jsonSchema) {
    return { contentType: JSON_CONTENT_TYPE, schema: jsonSchema };
  }
  const jsonLike = Object.entries(content).find(([type, entry]) => isJsonLike(type) && entry.schema);
  if (jsonLike?.[1].schema) {
    return { contentType: jsonLike[0], schema: jsonLike[1].schema };
  }
  const text = Object.keys(content).find(isText);
  if (text !== undefined) {
    return { contentType: text, schema: content[text]?.schema ?? TEXT_FALLBACK_SCHEMA };
  }
  const multipart = content[MULTIPART_CONTENT_TYPE]?.schema;
  if (multipart) {
    return { contentType: MULTIPART_CONTENT_TYPE, schema: multipart };
  }
  const binary = [BINARY_CONTENT_TYPE, "*/*"].find((type) => type in content);
  return binary === undefined ? undefined : { contentType: BINARY_CONTENT_TYPE, schema: BINARY_SCHEMA };
};
