import type { OpenApiOperation } from './open-api-operation';

export interface Operation {
  method: string;
  /** The full request path as the tool will call it. */
  path: string;
  spec: OpenApiOperation;
}
