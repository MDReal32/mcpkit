import { JSON_CONTENT_TYPE } from '../const.ts';
import { convertSchema } from '../schema/convert-schema.ts';
import type { BodyReasonOptions } from '../types/body-reason-options.ts';
import type { Operation } from '../types/operation.ts';
import { NO_NAMED_PROPERTIES_REASON } from './const.ts';

export const findBodyReason = (
  { method, spec }: Operation,
  {
    schema: schemaOptions,
    noNamedPropertiesReason = NO_NAMED_PROPERTIES_REASON,
    rejectsDottedNames,
  }: BodyReasonOptions,
) => {
  const content = method === 'get' ? undefined : spec.requestBody?.content;
  if (!content) {
    return undefined;
  }
  const schema = content[JSON_CONTENT_TYPE]?.schema;
  if (!schema) {
    return `request body is ${Object.keys(content).join(', ')}, only JSON bodies are supported`;
  }
  const names = Object.keys(convertSchema(schema, schemaOptions).properties ?? {});
  if (names.length === 0) {
    return noNamedPropertiesReason;
  }
  const dotted = rejectsDottedNames ? names.find((name) => name.includes('.')) : undefined;
  return dotted
    ? `request body property "${dotted}" contains a dot, which the executor reads as a nested path`
    : undefined;
};
