import { readProperty } from './read-property';

/**
 * Resolves `a.b.c` paths; a `name[]` segment maps the rest of the path over an array.
 * The return type is declared because TypeScript cannot infer it for this recursive function.
 */
export const getPath = (source: unknown, path: string): unknown => {
  const [head = '', ...rest] = path.split('.');
  const restPath = rest.join('.');
  if (!head.endsWith('[]')) {
    const value = readProperty(source, head);
    return restPath ? getPath(value, restPath) : value;
  }
  const list = readProperty(source, head.slice(0, -2));
  if (!Array.isArray(list)) {
    return undefined;
  }
  return restPath ? list.map((item) => getPath(item, restPath)) : list;
};
