import { HTTP_METHODS } from './const.ts';
import type { OpenApiDocument, OpenApiOperation, OpenApiParameter } from './types/open-api-operation.ts';
import type { Operation } from './types/operation.ts';
import type { SpecSource } from './types/spec-source.ts';

const isOperation = (candidate: OpenApiOperation | OpenApiParameter[] | undefined): candidate is OpenApiOperation =>
  candidate !== undefined && !Array.isArray(candidate);

const mergeParameters = (shared: OpenApiParameter[], own: OpenApiParameter[]) => [
  ...shared.filter(
    (parameter) => !own.some((candidate) => candidate.name === parameter.name && candidate.in === parameter.in),
  ),
  ...own,
];

export const collectOperations = (document: OpenApiDocument, source: SpecSource) =>
  Object.entries(document.paths).flatMap(([specPath, item]) => {
    const sharedParameters = Array.isArray(item.parameters) ? item.parameters : [];
    return HTTP_METHODS.flatMap((method) => {
      const spec = item[method];
      if (!isOperation(spec) || !spec.operationId) {
        return [];
      }
      const parameters = mergeParameters(sharedParameters, spec.parameters ?? []);
      const operation: Operation = {
        method,
        path: `${source.specPathPrefix}${specPath}`,
        spec: { ...spec, parameters },
      };
      return [operation];
    });
  });
