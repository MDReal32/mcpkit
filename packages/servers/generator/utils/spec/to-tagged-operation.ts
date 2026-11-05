import type { CategorizedOperation } from "../types/categorized-operation";
import type { OperationCandidate } from "../types/operation-candidate";

/** Categorizes an operation by its first tag, for specs whose tags already name the resource. */
export const toTaggedOperation = ({ method, path, spec }: OperationCandidate) => {
  const operation: CategorizedOperation = { method, path, category: spec.tags?.[0] ?? "", spec };
  return operation;
};
