import type { OpenApiOperation } from './open-api-operation';

export interface Operation {
  method: string;
  /** The full request path, including the spec source's path prefix. */
  path: string;
  spec: OpenApiOperation;
}
