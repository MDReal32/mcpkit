import type { OpenApiOperation } from '../../../utils/types/open-api-operation.ts';

export interface GithubOpenApiOperation extends OpenApiOperation {
  'x-github'?: { category?: string };
}
