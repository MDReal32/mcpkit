import { toToolNames } from '../../utils/naming/to-tool-names.ts';
import type { Operation } from '../../utils/types/operation.ts';
import type { OperationNames } from '../../utils/types/operation-names.ts';
import { deriveActionWords } from './derive-action-words.ts';
import { deriveDisambiguationWords } from './derive-disambiguation-words.ts';
import { deriveResource } from './derive-resource.ts';
import { splitPath } from './split-path.ts';
import type { SpecSource } from './types/spec-source.ts';

const FIRST_NUMBERED_ACTION = 2;

/**
 * Names the operations of one spec source, in the order given. Shorter paths claim an action first;
 * a later operation with the same resource and action gets a `by-<parameter>` suffix, then a number.
 */
export const nameOperations = (operations: readonly Operation[], source: SpecSource) => {
  const claimOrder = operations
    .map((operation, index) => ({ operation, index }))
    .sort(
      (a, b) =>
        splitPath(a.operation, source).length - splitPath(b.operation, source).length ||
        a.operation.path.localeCompare(b.operation.path) ||
        a.operation.method.localeCompare(b.operation.method),
    );
  const claimed = new Set<string>();
  const names: OperationNames[] = [];
  for (const { operation, index } of claimOrder) {
    const resource = deriveResource(operation, source);
    const base = deriveActionWords(operation, source);
    const isFree = (action: string) => !claimed.has(`${resource}/${action}`);
    const plain = base.join('-');
    const suffixed = [...base, ...deriveDisambiguationWords(operation, source)].join('-');
    let action = isFree(plain) ? plain : suffixed;
    for (let counter = FIRST_NUMBERED_ACTION; !isFree(action); counter += 1) {
      action = `${suffixed}-${counter}`;
    }
    claimed.add(`${resource}/${action}`);
    names[index] = toToolNames(source.group, resource, action);
  }
  return names;
};
