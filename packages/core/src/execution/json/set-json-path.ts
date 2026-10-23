import { isJsonObject } from '../../json';

/**
 * A copy of `target` with `value` at `segments`; numeric segments index arrays.
 * The return type is declared because TypeScript cannot infer it for this recursive function.
 */
export const setJsonPath = (target: unknown, segments: readonly string[], value: unknown): unknown => {
  const [head, ...rest] = segments;
  if (head === undefined) {
    return value;
  }
  if (/^\d+$/.test(head)) {
    const index = Number(head);
    const list: unknown[] = Array.isArray(target) ? [...target] : [];
    list[index] = setJsonPath(list[index], rest, value);
    return list;
  }
  const record = isJsonObject(target) ? target : {};
  return { ...record, [head]: setJsonPath(record[head], rest, value) };
};
