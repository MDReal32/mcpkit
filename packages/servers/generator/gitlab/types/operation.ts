import type { OpenApiOperation } from './open-api-operation';

export interface Operation {
  method: string;
  path: string;
  category: string;
  returnsArray: boolean;
  spec: OpenApiOperation;
}
