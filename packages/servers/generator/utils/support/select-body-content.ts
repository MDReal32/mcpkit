import { JSON_CONTENT_TYPE, TEXT_FALLBACK_SCHEMA } from "../const";
import type { OpenApiRequestBody } from "../types/open-api-operation";
import type { OpenApiSchema } from "../types/open-api-schema";
import type { SelectedBodyContent } from "../types/selected-body-content";

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
  if (text === undefined) {
    return undefined;
  }
  const schema: OpenApiSchema = content[text]?.schema ?? TEXT_FALLBACK_SCHEMA;
  return { contentType: text, schema };
};
