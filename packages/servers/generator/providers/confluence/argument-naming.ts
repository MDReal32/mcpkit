import { prefixIfTaken } from '../../utils/tool/prefix-if-taken';
import type { ArgumentNaming } from '../../utils/types/argument-naming';
import { toArgName } from './to-arg-name';

export const argumentNaming: ArgumentNaming = {
  dropsQueryShadowedByPath: true,
  parameter: (parameter, taken) => {
    const argName = toArgName(parameter.name);
    if (taken.has(argName)) {
      throw new Error(`parameter "${parameter.name}" maps to the already used argument "${argName}"`);
    }
    return argName;
  },
  bodyProperty: (key, taken) => prefixIfTaken(toArgName(key), taken),
};
