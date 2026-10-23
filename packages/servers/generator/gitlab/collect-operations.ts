import { API_PATH_PREFIX, HTTP_METHODS, JSON_CONTENT_TYPE } from './const.ts';
import { pickType } from './pick-type.ts';
import type { OpenApiDocument, OpenApiOperation } from './types/open-api-operation.ts';
import type { Operation } from './types/operation.ts';

const isSuccessStatus = (status: string) => status.startsWith('2');

const returnsArray = (spec: OpenApiOperation) =>
  Object.entries(spec.responses ?? {})
    .filter(([status]) => isSuccessStatus(status))
    .some(([, response]) => {
      const schema = response.content?.[JSON_CONTENT_TYPE]?.schema;
      return schema !== undefined && pickType(schema) === 'array';
    });

export const collectOperations = (document: OpenApiDocument) =>
  Object.entries(document.paths).flatMap(([path, item]) =>
    HTTP_METHODS.flatMap((method) => {
      const spec = item[method];
      if (!spec?.operationId) {
        return [];
      }
      const operation: Operation = {
        method,
        path: path.startsWith(API_PATH_PREFIX) ? path.slice(API_PATH_PREFIX.length) : path,
        category: spec.tags?.[0] ?? '',
        returnsArray: returnsArray(spec),
        spec,
      };
      return [operation];
    }),
  );
