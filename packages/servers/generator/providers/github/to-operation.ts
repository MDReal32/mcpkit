import type { CategorizedOperation } from '../../utils/types/categorized-operation.ts';
import type { OperationCandidate } from '../../utils/types/operation-candidate.ts';
import type { GithubOpenApiOperation } from './types/github-open-api-operation.ts';

export const toOperation = ({ method, path, spec }: OperationCandidate) => {
  const operation: CategorizedOperation = {
    method,
    path,
    category: (spec as GithubOpenApiOperation)['x-github']?.category ?? '',
    spec,
  };
  return operation;
};
