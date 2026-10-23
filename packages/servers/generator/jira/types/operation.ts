import type { OpenApiOperation } from './open-api-operation.ts';

export interface Operation {
  source: string;
  method: string;
  path: string;
  category: string;
  spec: OpenApiOperation;
}
