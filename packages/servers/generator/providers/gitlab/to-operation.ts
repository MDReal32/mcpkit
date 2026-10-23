import type { OperationCandidate } from "../../utils/types/operation-candidate";
import { API_PATH_PREFIX } from "./const";
import { returnsArray } from "./returns-array";
import type { GitlabOperation } from "./types/gitlab-operation";

export const toOperation = ({ method, path, spec }: OperationCandidate) => {
  const operation: GitlabOperation = {
    method,
    path: path.startsWith(API_PATH_PREFIX) ? path.slice(API_PATH_PREFIX.length) : path,
    category: spec.tags?.[0] ?? "",
    returnsArray: returnsArray(spec),
    spec,
  };
  return operation;
};
