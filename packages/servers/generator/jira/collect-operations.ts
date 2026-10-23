import { HTTP_METHODS, UNTAGGED_CATEGORY } from './const.ts';
import type { OpenApiDocument, OpenApiOperation } from './types/open-api-operation.ts';
import type { Operation } from './types/operation.ts';
import type { SpecSource } from './types/spec-source.ts';

const isOperation = (candidate: OpenApiOperation | unknown[] | undefined): candidate is OpenApiOperation =>
  candidate !== undefined && !Array.isArray(candidate);

export const collectOperations = (document: OpenApiDocument, source: SpecSource) =>
  Object.entries(document.paths)
    .filter(([path]) => path.startsWith(source.pathPrefix))
    .flatMap(([path, item]) =>
      HTTP_METHODS.flatMap((method) => {
        const spec = item[method];
        if (!isOperation(spec) || !spec.operationId) {
          return [];
        }
        const category = spec.tags?.[0] ?? UNTAGGED_CATEGORY;
        const operation: Operation = { source: source.name, method, path, category, spec };
        return [operation];
      }),
    );
