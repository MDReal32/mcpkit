import type { OpenApiDocument, OpenApiOperation, OpenApiParameter } from '../types/open-api-operation.ts';
import type { Operation } from '../types/operation.ts';
import type { OperationReader } from '../types/operation-reader.ts';
import { HTTP_METHODS } from './const.ts';

const isOperation = (candidate: OpenApiOperation | OpenApiParameter[] | undefined): candidate is OpenApiOperation =>
  candidate !== undefined && !Array.isArray(candidate);

export const collectOperations = <Result extends Operation>(
  document: OpenApiDocument,
  { acceptsPath = () => true, toOperation }: OperationReader<Result>,
) =>
  Object.entries(document.paths)
    .filter(([path]) => acceptsPath(path))
    .flatMap(([path, pathItem]) =>
      HTTP_METHODS.flatMap((method) => {
        const spec = pathItem[method];
        if (!isOperation(spec) || !spec.operationId) {
          return [];
        }
        return [toOperation({ method, path, spec, pathItem })];
      }),
    );
