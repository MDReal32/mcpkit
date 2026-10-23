import type { OpenApiDocument, OpenApiOperation, OpenApiParameter } from '../types/open-api-operation';
import type { Operation } from '../types/operation';
import type { OperationReader } from '../types/operation-reader';
import { HTTP_METHODS } from './const';

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
