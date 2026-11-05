import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import type { OperationCandidate } from "../../utils/types/operation-candidate";

export const toOperation = ({ method, path, spec }: OperationCandidate) => {
  const operation: CategorizedOperation = { method, path, category: spec.tags?.[0] ?? "", spec };
  return operation;
};
