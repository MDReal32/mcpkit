import { findGroupName } from '../../utils/naming/find-group-name.ts';
import { SERVER_GROUPS } from './const.ts';
import { createNameAllocator } from './create-name-allocator.ts';
import type { GitlabOperation } from './types/gitlab-operation.ts';

export const nameOperations = (operations: GitlabOperation[]) => {
  const allocateNames = createNameAllocator();
  const ungrouped = new Set<string>();
  const names = operations.flatMap((operation) => {
    const group = findGroupName(SERVER_GROUPS, operation.category);
    if (!group) {
      ungrouped.add(operation.category);
      return [];
    }
    return [allocateNames(group, operation)];
  });
  if (ungrouped.size > 0) {
    throw new Error(`categories that belong to no server group: ${[...ungrouped].join(', ')}`);
  }
  return names;
};
