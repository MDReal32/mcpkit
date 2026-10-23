import { prefixIfTaken } from '../../utils/tool/prefix-if-taken.ts';
import type { ArgumentNaming } from '../../utils/types/argument-naming.ts';
import { toArgumentName } from './to-argument-name.ts';

export const argumentNaming: ArgumentNaming = {
  dropsQueryShadowedByPath: false,
  parameter: (parameter, taken) => {
    if (parameter.in === 'path') {
      return parameter.name;
    }
    const base = toArgumentName(parameter.name);
    return taken.has(base) ? `${base}_${taken.size}` : base;
  },
  bodyProperty: (key, taken, claimedByBody) => {
    const candidate = prefixIfTaken(toArgumentName(key), taken);
    return claimedByBody.has(candidate) ? `${candidate}_${claimedByBody.size}` : candidate;
  },
};
