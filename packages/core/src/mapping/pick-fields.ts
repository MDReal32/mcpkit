import type { NameMapping } from '../manifest';
import { getPath } from './get-path';

export const pickFields = (item: unknown, fieldMapping: NameMapping) =>
  Object.fromEntries(
    Object.entries(fieldMapping).map(([outputName, path]) => [outputName, getPath(item, path) ?? null]),
  );
