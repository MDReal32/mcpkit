import { BODY_KEY_PREFIX } from '../schema/const.ts';

export const prefixIfTaken = (name: string, takenNames: ReadonlySet<string>) =>
  takenNames.has(name) ? `${BODY_KEY_PREFIX}${name}` : name;
