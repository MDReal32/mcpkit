import type { OpenApiParameter } from "../../utils/types/open-api-operation";
import type { Operation } from "../../utils/types/operation";
import type { OperationCandidate } from "../../utils/types/operation-candidate";
import { mergeParameters } from "./merge-parameters";
import type { SpecSource } from "./types/spec-source";

export const toOperation = ({ method, path, spec, pathItem }: OperationCandidate, source: SpecSource) => {
  const sharedParameters: OpenApiParameter[] = Array.isArray(pathItem.parameters) ? pathItem.parameters : [];
  const operation: Operation = {
    method,
    path: `${source.specPathPrefix}${path}`,
    spec: { ...spec, parameters: mergeParameters(sharedParameters, spec.parameters ?? []) },
  };
  return operation;
};
