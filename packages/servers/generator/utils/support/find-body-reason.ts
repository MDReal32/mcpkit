import { MULTIPART_CONTENT_TYPE } from "../const";
import { convertSchema } from "../schema/convert-schema";
import type { BodyReasonOptions } from "../types/body-reason-options";
import type { Operation } from "../types/operation";
import { selectBodyContent } from "./select-body-content";

export const findBodyReason = (
  { method, spec }: Operation,
  { schema: schemaOptions, rejectsDottedNames }: BodyReasonOptions,
) => {
  const content = method === "get" ? undefined : spec.requestBody?.content;
  if (!content) {
    return undefined;
  }
  const selected = selectBodyContent(content);
  if (!selected) {
    return `request body is ${Object.keys(content).join(", ")}, only JSON and text bodies are supported`;
  }
  const emptyMultipart = selected.contentType === MULTIPART_CONTENT_TYPE && !selected.schema.properties;
  if (emptyMultipart) {
    return "request body is multipart/form-data without named parts";
  }
  const names = Object.keys(convertSchema(selected.schema, schemaOptions).properties ?? {});
  const dotted = rejectsDottedNames ? names.find((name) => name.includes(".")) : undefined;
  return dotted
    ? `request body property "${dotted}" contains a dot, which the executor reads as a nested path`
    : undefined;
};
