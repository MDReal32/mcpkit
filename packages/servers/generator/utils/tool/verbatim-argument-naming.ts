import type { ArgumentNaming } from '../types/argument-naming.ts';
import { prefixIfTaken } from './prefix-if-taken.ts';

export const verbatimArgumentNaming: ArgumentNaming = {
  dropsQueryShadowedByPath: true,
  parameter: (parameter) => parameter.name,
  bodyProperty: (key, taken) => prefixIfTaken(key, taken),
};
