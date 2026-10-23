import { EXCLUDED_TAG_PREFIXES, EXCLUDED_TAGS, JSON_CONTENT_TYPE } from './const.ts';
import { convertSchema } from './convert-schema.ts';
import type { Operation } from './types/operation.ts';

const findExcludedTagReason = (tag: string) => {
  const prefix = Object.keys(EXCLUDED_TAG_PREFIXES).find((candidate) => tag.startsWith(candidate));
  return EXCLUDED_TAGS[tag] ?? (prefix === undefined ? undefined : EXCLUDED_TAG_PREFIXES[prefix]);
};

const findUndeclaredPlaceholder = ({ path, spec }: Operation) => {
  const declared = new Set(
    (spec.parameters ?? []).filter((parameter) => parameter.in === 'path').map(({ name }) => name),
  );
  return [...path.matchAll(/\{([^}]+)\}/g)].map((match) => match[1] ?? '').find((name) => !declared.has(name));
};

export const findUnsupportedReason = (operation: Operation) => {
  const { method, category, spec } = operation;
  const undeclared = findUndeclaredPlaceholder(operation);
  if (undeclared) {
    return `path placeholder {${undeclared}} is not declared as a path parameter in the spec`;
  }
  if (category === '') {
    return 'operation has no tag';
  }
  const excludedReason = findExcludedTagReason(category);
  if (excludedReason) {
    return excludedReason;
  }
  const content = method === 'get' ? undefined : spec.requestBody?.content;
  if (!content) {
    return undefined;
  }
  const schema = content[JSON_CONTENT_TYPE]?.schema;
  if (!schema) {
    return `request body is ${Object.keys(content).join(', ')}, only JSON bodies are supported`;
  }
  if (Object.keys(convertSchema(schema).properties ?? {}).length === 0) {
    return 'request body has no named properties';
  }
  return undefined;
};
