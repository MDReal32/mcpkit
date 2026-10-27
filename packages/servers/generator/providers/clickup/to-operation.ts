import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import type { OperationCandidate } from "../../utils/types/operation-candidate";
import { API_PATH_PREFIX } from "./const";
import { toQueryParameter } from "./to-query-parameter";
import { toRequestBody } from "./to-request-body";

export const toOperation = ({ method, path, spec }: OperationCandidate) => {
  const operation: CategorizedOperation = {
    method,
    path: path.startsWith(`${API_PATH_PREFIX}/`) ? path.slice(API_PATH_PREFIX.length) : path,
    category: spec.tags?.[0] ?? "",
    spec: { ...spec, parameters: spec.parameters?.map(toQueryParameter), requestBody: toRequestBody(spec.requestBody) },
  };
  return operation;
};
