import { findGroupName } from '../../utils/naming/find-group-name.ts';
import type { CategorizedOperation } from '../../utils/types/categorized-operation.ts';
import { SERVER_GROUPS } from './const.ts';
import { toToolNames } from './to-tool-names.ts';

export const nameOperations = (operations: CategorizedOperation[]) =>
  operations.map(({ category, spec }) => {
    const operationId = spec.operationId ?? '';
    const group = findGroupName(SERVER_GROUPS, category);
    if (!group) {
      throw new Error(`${operationId}: category "${category}" belongs to no server group`);
    }
    return toToolNames(group, operationId);
  });
