import type { NameList } from './types/tool/name-list';
import type { NameMapping } from './types/tool/name-mapping';

export const isNameList = (spec: NameList | NameMapping): spec is NameList => Array.isArray(spec);
