import { mapMultipartParts } from "../../utils/schema/map-multipart-parts";
import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import type { OperationCandidate } from "../../utils/types/operation-candidate";
import { API_PATH_PREFIX } from "./const";
import { toFilePart } from "./to-file-part";
import { toQueryParameter } from "./to-query-parameter";

export const toOperation = ({ method, path, spec }: OperationCandidate) => {
  const operation: CategorizedOperation = {
    method,
    path: path.startsWith(`${API_PATH_PREFIX}/`) ? path.slice(API_PATH_PREFIX.length) : path,
    category: spec.tags?.[0] ?? "",
    spec: {
      ...spec,
      parameters: spec.parameters?.map(toQueryParameter),
      requestBody: mapMultipartParts(spec.requestBody, toFilePart),
    },
  };
  return operation;
};
