import type { OpenApiParameter } from '../../utils/types/open-api-operation.ts';
import type { Operation } from '../../utils/types/operation.ts';
import type { OperationCandidate } from '../../utils/types/operation-candidate.ts';
import { mergeParameters } from './merge-parameters.ts';
import type { SpecSource } from './types/spec-source.ts';

export const toOperation = ({ method, path, spec, pathItem }: OperationCandidate, source: SpecSource) => {
  const sharedParameters: OpenApiParameter[] = Array.isArray(pathItem.parameters) ? pathItem.parameters : [];
  const operation: Operation = {
    method,
    path: `${source.specPathPrefix}${path}`,
    spec: { ...spec, parameters: mergeParameters(sharedParameters, spec.parameters ?? []) },
  };
  return operation;
};
