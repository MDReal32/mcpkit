import type { OperationCandidate } from '../../utils/types/operation-candidate.ts';
import { API_PATH_PREFIX } from './const.ts';
import { returnsArray } from './returns-array.ts';
import type { GitlabOperation } from './types/gitlab-operation.ts';

export const toOperation = ({ method, path, spec }: OperationCandidate) => {
  const operation: GitlabOperation = {
    method,
    path: path.startsWith(API_PATH_PREFIX) ? path.slice(API_PATH_PREFIX.length) : path,
    category: spec.tags?.[0] ?? '',
    returnsArray: returnsArray(spec),
    spec,
  };
  return operation;
};
