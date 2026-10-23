import type { Operation } from './types/operation.ts';
import type { SpecSource } from './types/spec-source.ts';

export const isPathParameter = (segment: string) => segment.startsWith('{') && segment.endsWith('}');

/** The path segments below the API root: the first is the resource, the rest narrow the action. */
export const splitPath = ({ path }: Operation, source: SpecSource) =>
  path
    .slice(source.apiRoot.length)
    .split('/')
    .filter((segment) => segment.length > 0);
