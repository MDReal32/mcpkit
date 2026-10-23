import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import type { OperationCandidate } from "../../utils/types/operation-candidate";
import type { GithubOpenApiOperation } from "./types/github-open-api-operation";

export const toOperation = ({ method, path, spec }: OperationCandidate) => {
  const operation: CategorizedOperation = {
    method,
    path,
    category: (spec as GithubOpenApiOperation)["x-github"]?.category ?? "",
    spec,
  };
  return operation;
};
