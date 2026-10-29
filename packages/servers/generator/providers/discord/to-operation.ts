import { mapMultipartParts } from "../../utils/schema/map-multipart-parts";
import { mergeParameters } from "../../utils/spec/merge-parameters";
import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import type { OpenApiParameter } from "../../utils/types/open-api-operation";
import type { OperationCandidate } from "../../utils/types/operation-candidate";
import { toFilePart } from "./to-file-part";

export const toOperation = ({ method, path, spec, pathItem }: OperationCandidate) => {
  const sharedParameters: OpenApiParameter[] = Array.isArray(pathItem.parameters) ? pathItem.parameters : [];
  const operation: CategorizedOperation = {
    method,
    path,
    category: path.split("/")[1] ?? "",
    spec: {
      ...spec,
      parameters: mergeParameters(sharedParameters, spec.parameters ?? []),
      requestBody: mapMultipartParts(spec.requestBody, toFilePart),
    },
  };
  return operation;
};
