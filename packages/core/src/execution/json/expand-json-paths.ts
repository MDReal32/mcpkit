import { setJsonPath } from './set-json-path';

/** `{ 'fields.summary': 'x' }` → `{ fields: { summary: 'x' } }`. */
export const expandJsonPaths = (values: Readonly<Record<string, unknown>>) =>
  Object.entries(values).reduce<unknown>((body, [path, value]) => setJsonPath(body, path.split('.'), value), {});
