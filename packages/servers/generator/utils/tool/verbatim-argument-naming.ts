import type { ArgumentNaming } from '../types/argument-naming';
import { prefixIfTaken } from './prefix-if-taken';

export const verbatimArgumentNaming: ArgumentNaming = {
  dropsQueryShadowedByPath: true,
  parameter: (parameter) => parameter.name,
  bodyProperty: (key, taken) => prefixIfTaken(key, taken),
};
