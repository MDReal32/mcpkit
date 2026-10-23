import { JSON_CONTENT_TYPE } from "../const";
import { convertSchema } from "../schema/convert-schema";
import type { BodyReasonOptions } from "../types/body-reason-options";
import type { Operation } from "../types/operation";

export const findBodyReason = (
  { method, spec }: Operation,
  { schema: schemaOptions, rejectsDottedNames }: BodyReasonOptions,
) => {
  const content = method === "get" ? undefined : spec.requestBody?.content;
  if (!content) {
    return undefined;
  }
  const schema = content[JSON_CONTENT_TYPE]?.schema;
  if (!schema) {
    return `request body is ${Object.keys(content).join(", ")}, only JSON bodies are supported`;
  }
  const names = Object.keys(convertSchema(schema, schemaOptions).properties ?? {});
  const dotted = rejectsDottedNames ? names.find((name) => name.includes(".")) : undefined;
  return dotted
    ? `request body property "${dotted}" contains a dot, which the executor reads as a nested path`
    : undefined;
};
