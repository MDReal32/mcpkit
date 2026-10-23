import { HTTP_METHODS } from './const.ts';
import type { OpenApiDocument, OpenApiOperation } from './types/open-api-operation.ts';
import type { Operation } from './types/operation.ts';

const isOperation = (candidate: OpenApiOperation | unknown[] | undefined): candidate is OpenApiOperation =>
  candidate !== undefined && !Array.isArray(candidate);

export const collectOperations = (document: OpenApiDocument) =>
  Object.entries(document.paths).flatMap(([path, item]) =>
    HTTP_METHODS.flatMap((method) => {
      const spec = item[method];
      if (!isOperation(spec) || !spec.operationId) {
        return [];
      }
      const category = spec['x-github']?.category ?? '';
      const operation: Operation = { method, path, category, spec };
      return [operation];
    }),
  );
