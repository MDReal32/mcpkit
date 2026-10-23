import { findGroupName } from '../../utils/naming/find-group-name.ts';
import { SERVER_GROUPS } from './const.ts';
import { toToolNames } from './to-tool-names.ts';
import type { JiraOperation } from './types/jira-operation.ts';
import type { SpecSource } from './types/spec-source.ts';

export const nameOperations = (operations: JiraOperation[], source: SpecSource) =>
  operations.map((operation) => {
    const operationId = operation.spec.operationId ?? '';
    const groupName = source.group ?? findGroupName(SERVER_GROUPS, operation.category);
    if (!groupName) {
      throw new Error(`${source.name}:${operationId}: category "${operation.category}" belongs to no server group`);
    }
    return toToolNames(groupName, operation.category, operationId);
  });
