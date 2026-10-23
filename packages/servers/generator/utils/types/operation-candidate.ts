import type { OpenApiOperation, OpenApiPathItem } from './open-api-operation.ts';

export interface OperationCandidate {
  method: string;
  path: string;
  spec: OpenApiOperation;
  pathItem: OpenApiPathItem;
}
