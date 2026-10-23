import { isNameList } from './is-name-list';
import type { NameList } from './types/tool/name-list';
import type { NameMapping } from './types/tool/name-mapping';

export const toNameMapping = (spec: NameList | NameMapping) => {
  if (!isNameList(spec)) {
    return spec;
  }
  const mapping: NameMapping = Object.fromEntries(spec.map((name) => [name, name]));
  return mapping;
};
