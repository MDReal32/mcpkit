import type { Operation } from '../../utils/types/operation.ts';
import { RESOURCE_RENAMES } from './const.ts';
import { splitPath } from './split-path.ts';
import { toWords } from './to-words.ts';
import type { SpecSource } from './types/spec-source.ts';

export const deriveResource = (operation: Operation, source: SpecSource) => {
  const [segment = ''] = splitPath(operation, source);
  const folder = toWords(segment).join('-');
  return RESOURCE_RENAMES[folder] ?? folder;
};
