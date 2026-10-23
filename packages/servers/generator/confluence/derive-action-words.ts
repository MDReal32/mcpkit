import { LIST_VERB, PATH_VERBS } from './const.ts';
import { isPathParameter, splitPath } from './split-path.ts';
import { toWords } from './to-words.ts';
import type { Operation } from './types/operation.ts';
import type { SpecSource } from './types/spec-source.ts';

const deriveFromPath = (operation: Operation, source: SpecSource) => {
  const [, ...rest] = splitPath(operation, source);
  const staticWords = rest.filter((segment) => !isPathParameter(segment)).flatMap(toWords);
  const isCollection = operation.method === 'get' && rest.length === 0;
  const verb = isCollection ? LIST_VERB : (PATH_VERBS[operation.method] ?? operation.method);
  return [verb, ...staticWords];
};

export const deriveActionWords = (operation: Operation, source: SpecSource) =>
  source.naming === 'operation-id' ? toWords(operation.spec.operationId ?? '') : deriveFromPath(operation, source);
