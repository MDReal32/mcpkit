import type { OperationCandidate } from '../../utils/types/operation-candidate.ts';
import { UNTAGGED_CATEGORY } from './const.ts';
import type { JiraOperation } from './types/jira-operation.ts';
import type { SpecSource } from './types/spec-source.ts';

export const toOperation = ({ method, path, spec }: OperationCandidate, source: SpecSource) => {
  const operation: JiraOperation = {
    source: source.name,
    method,
    path,
    category: spec.tags?.[0] ?? UNTAGGED_CATEGORY,
    spec,
  };
  return operation;
};
