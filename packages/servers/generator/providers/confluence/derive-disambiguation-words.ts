import type { Operation } from '../../utils/types/operation.ts';
import { isPathParameter, splitPath } from './split-path.ts';
import { toWords } from './to-words.ts';
import type { SpecSource } from './types/spec-source.ts';

/** `by-<parameter>` for a path that ends in a parameter, added when two operations would share an action. */
export const deriveDisambiguationWords = (operation: Operation, source: SpecSource) => {
  const segments = splitPath(operation, source);
  const last = segments.at(-1);
  return last && segments.length > 1 && isPathParameter(last) ? ['by', ...toWords(last)] : [];
};
