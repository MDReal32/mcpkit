import { JSON_CONTENT_TYPE } from './const.ts';
import { convertSchema } from './convert-schema.ts';
import type { Operation } from './types/operation.ts';
import type { SpecSource } from './types/spec-source.ts';

const findBodyReason = ({ method, spec }: Operation) => {
  const content = method === 'get' ? undefined : spec.requestBody?.content;
  if (!content) {
    return undefined;
  }
  const schema = content[JSON_CONTENT_TYPE]?.schema;
  if (!schema) {
    return `request body is ${Object.keys(content).join(', ')}, only JSON bodies are supported`;
  }
  const names = Object.keys(convertSchema(schema).properties ?? {});
  if (names.length === 0) {
    return 'request body is an array or free-form object, only objects with named properties are supported';
  }
  const dotted = names.find((name) => name.includes('.'));
  return dotted
    ? `request body property "${dotted}" contains a dot, which the executor reads as a nested path`
    : undefined;
};

export const findUnsupportedReason = (operation: Operation, source: SpecSource) => {
  if (!operation.path.startsWith(`${source.apiRoot}/`)) {
    return `path ${operation.path} is outside ${source.apiRoot}`;
  }
  const header = (operation.spec.parameters ?? []).find((parameter) => parameter.in === 'header' && parameter.required);
  if (header) {
    return `required header ${header.name} cannot be sent, header parameters are unsupported`;
  }
  return findBodyReason(operation);
};
