import type { Operation } from '../../utils/types/operation';
import { LIST_VERB, PATH_VERBS } from './const';
import { isPathParameter, splitPath } from './split-path';
import { toWords } from './to-words';
import type { SpecSource } from './types/spec-source';

const deriveFromPath = (operation: Operation, source: SpecSource) => {
  const [, ...rest] = splitPath(operation, source);
  const staticWords = rest.filter((segment) => !isPathParameter(segment)).flatMap(toWords);
  const isCollection = operation.method === 'get' && rest.length === 0;
  const verb = isCollection ? LIST_VERB : (PATH_VERBS[operation.method] ?? operation.method);
  return [verb, ...staticWords];
};

export const deriveActionWords = (operation: Operation, source: SpecSource) =>
  source.naming === 'operation-id' ? toWords(operation.spec.operationId ?? '') : deriveFromPath(operation, source);
